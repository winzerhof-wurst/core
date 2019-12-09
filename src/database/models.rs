use chrono::NaiveDateTime;

#[derive(Queryable, Serialize)]
pub struct Customer {
    pub id: i32,
    pub firstname: String,
    pub lastname: String,
    pub street: String,
    pub nr: String,
    pub city: String,
    pub telephone: String,
    pub fax: String,
    pub email: String,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

#[derive(Queryable, Serialize)]
pub struct Order {
    pub id: i32,
    pub customer_id: String,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

#[derive(Queryable, Serialize)]
pub struct Tidbit {
    pub id: i32,
    pub name: String,
}

#[derive(Queryable, Serialize)]
pub struct Wine {
    pub id: i32,
    pub name: String,
}
