use actix::prelude::*;
use diesel::dsl::insert_into;
use diesel::prelude::*;
use failure::Error;

use database::models::{Customer, Tidbit, Wine};

pub struct WinesActor(PgConnection);

impl WinesActor {
    pub fn new(conn: PgConnection) -> Self {
        WinesActor(conn)
    }
}

impl Actor for WinesActor {
    type Context = SyncContext<Self>;
}

pub struct FetchTidbits {}
pub struct FetchWines {}
pub struct PostOrder {
    firstname: String,
    lastname: String,
    street: String,
    nr: String,
    zipcode: usize,
    city: String,
    email: String,
    telephone: String,
    fax: String,
    comment: Option<String>,
    tidbit_ids: Vec<i32>,
    wine_ids: Vec<i32>,
}

impl Message for FetchTidbits {
    type Result = Result<Vec<Tidbit>, Error>;
}

impl Message for FetchWines {
    type Result = Result<Vec<Wine>, Error>;
}

impl PostOrder {
    pub fn new(
        firstname: String,
        lastname: String,
        street: String,
        nr: String,
        zipcode: usize,
        city: String,
        email: String,
        telephone: String,
        fax: String,
        comment: Option<String>,
        tidbit_ids: Vec<i32>,
        wine_ids: Vec<i32>,
    ) -> Self {
        PostOrder {
            firstname: firstname,
            lastname: lastname,
            street: street,
            nr: nr,
            zipcode: zipcode,
            city: city,
            email: email,
            telephone: telephone,
            fax: fax,
            comment: comment,
            tidbit_ids: tidbit_ids,
            wine_ids: wine_ids,
        }
    }
}

impl Message for PostOrder {
    type Result = Result<(), Error>;
}

impl Handler<FetchTidbits> for WinesActor {
    type Result = Result<Vec<Tidbit>, Error>;

    fn handle(&mut self, _msg: FetchTidbits, _: &mut Self::Context) -> Self::Result {
        use database::schema::tidbits::dsl::*;

        tidbits.load(&self.0).map_err(Error::from)
    }
}

impl Handler<FetchWines> for WinesActor {
    type Result = Result<Vec<Wine>, Error>;

    fn handle(&mut self, _msg: FetchWines, _: &mut Self::Context) -> Self::Result {
        use database::schema::wines::dsl::*;

        wines.load(&self.0).map_err(Error::from)
    }
}

fn create_customer(msg: &PostOrder, conn: &PgConnection) -> Result<Customer, Error> {
    use database::schema::customers::dsl::*;

    let customer = insert_into(customers)
        .values((
            firstname.eq(&msg.firstname),
            lastname.eq(&msg.lastname),
            street.eq(&msg.street),
            nr.eq(&msg.nr),
            city.eq(&msg.city),
            telephone.eq(&msg.telephone),
            fax.eq(&msg.fax),
            email.eq(&msg.email),
        ))
        .get_result(conn)?;
    Ok(customer)
}

fn save_order(msg: &PostOrder, customer: &Customer, conn: &PgConnection) -> Result<(), Error> {
    for id in msg.wine_ids {
        use database::schema::orders::dsl::*;

        let order = insert_into(orders)
            .values((customer_id.eq(customer.id),))
            .execute(conn)?;
    }

    Ok(())
}

impl Handler<PostOrder> for WinesActor {
    type Result = Result<(), Error>;

    fn handle(&mut self, msg: PostOrder, _: &mut Self::Context) -> Self::Result {
        let customer = create_customer(&msg, &self.0)?;

        save_order(&msg, &customer, &self.0)?;

        Ok(())
    }
}
