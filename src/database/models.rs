use chrono::NaiveDateTime;

#[derive(Queryable, Serialize)]
pub struct Customer {
    pub id: i32,
    pub firstname: String,
    pub lastname: String,
    pub street: String,
    pub nr: String,
    pub city: String,
    pub zipcore: i32,
    pub country_code: String,
    pub telephone: String,
    pub fax: String,
    pub email: String,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

#[derive(Queryable, Serialize)]
pub struct Order {
    pub id: i32,
    pub customer_id: i32,
    pub comment: Option<String>,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

#[derive(Queryable, Serialize)]
pub struct OrderItem {
    pub id: i32,
    pub order_id: i32,
    pub name: String,
    pub price: i32,
    pub tax_rate: i32,
    pub wine_id: Option<i32>,
    pub tidbit_id: Option<i32>,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

#[derive(Queryable, Serialize)]
pub struct Tidbit {
    pub id: i32,
    pub name: String,
    pub price: i32,
    pub tax_rate: i32,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

#[derive(Queryable, Serialize)]
pub struct Wine {
    pub id: i32,
    pub name: String,
    pub price: i32,
    pub year: Option<i32>,
    pub tax_rate: i32,
    pub r#type: String,
    pub description: String,
    pub text: Option<String>,
    pub unit: String,
    pub available: bool,
    pub out_of_stock: bool,
    pub order: i32,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}
