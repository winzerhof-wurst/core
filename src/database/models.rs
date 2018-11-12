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
