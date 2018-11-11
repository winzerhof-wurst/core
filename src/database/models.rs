#[derive(Queryable, Serialize)]
pub struct Wine {
    pub id: i32,
    pub name: String,
}
