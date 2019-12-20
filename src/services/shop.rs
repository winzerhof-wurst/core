use diesel::dsl::insert_into;
use diesel::prelude::*;
use failure::Error;

use crate::database;
use crate::database::models::{Customer, Tidbit, Wine};

#[derive(Deserialize)]
pub struct Order {
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
    tidbit_ids: Option<Vec<i32>>,
    wine_ids: Option<Vec<i32>>,
}

pub fn fetch_tidbits(conn: &database::Connection) -> Result<Vec<Tidbit>, Error> {
    use crate::database::schema::tidbits::dsl::*;

    tidbits.load(conn).map_err(Error::from)
}

pub fn fetch_wines(conn: &database::Connection) -> Result<Vec<Tidbit>, Error> {
    use crate::database::schema::wines::dsl::*;

    wines.load(conn).map_err(Error::from)
}

fn create_customer(order: &Order, conn: &database::Connection) -> Result<Customer, Error> {
    use crate::database::schema::customers::dsl::*;

    let customer = insert_into(customers)
        .values((
            firstname.eq(&order.firstname),
            lastname.eq(&order.lastname),
            street.eq(&order.street),
            nr.eq(&order.nr),
            city.eq(&order.city),
            telephone.eq(&order.telephone),
            fax.eq(&order.fax),
            email.eq(&order.email),
        ))
        .get_result(conn)?;
    Ok(customer)
}

fn save_order(msg: &Order, customer: &Customer, conn: &database::Connection) -> Result<(), Error> {
    for _ in &msg.wine_ids {
        use crate::database::schema::orders::dsl::*;

        let order = insert_into(orders)
            .values((customer_id.eq(customer.id),))
            .execute(conn)?;
    }

    Ok(())
}

pub fn post_order(order: Order, conn: &database::Connection) -> Result<(), Error> {
    let customer = create_customer(&order, conn)?;

    save_order(&order, &customer, conn)?;

    Ok(())
}
