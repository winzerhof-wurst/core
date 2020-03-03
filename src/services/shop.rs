use diesel::dsl::insert_into;
use diesel::prelude::*;
use failure::Error;

use crate::database;
use crate::database::models::{Customer, Product};

#[derive(Deserialize)]
pub struct Order {
    firstname: String,
    lastname: String,
    street: String,
    nr: String,
    zipcode: i32,
    city: String,
    email: String,
    telephone: String,
    fax: String,
    comment: Option<String>,
    product_ids: Vec<i32>,
}

pub fn fetch_products(conn: &database::Connection) -> Result<Vec<Product>, Error> {
    use crate::database::schema::products::dsl::*;

    products.load(conn).map_err(Error::from)
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
            zipcode.eq(&order.zipcode),
            telephone.eq(&order.telephone),
            fax.eq(&order.fax),
            email.eq(&order.email),
        ))
        .get_result(conn)?;
    Ok(customer)
}

fn save_order(
    order: &Order,
    customer: &Customer,
    conn: &database::Connection,
) -> Result<(), Error> {
    let db_order = database::save_order(conn, &customer.id, order.comment.as_ref())?;

    order
        .product_ids
        .iter()
        .flat_map(|id| database::find_product(conn, id))
        .map(|p| database::save_order_item(conn, &db_order.id, &p.name, &p.price, p.tax_rate))
        .collect::<Result<Vec<_>, Error>>()?;

    Ok(())
}

pub fn post_order(order: Order, conn: &database::Connection) -> Result<(), Error> {
    let customer = create_customer(&order, conn)?;

    save_order(&order, &customer, conn)?;

    Ok(())
}
