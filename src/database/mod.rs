pub mod models;
pub mod schema;

use diesel::pg::PgConnection;
use diesel::r2d2;

pub type Connection = PgConnection;
pub type ConnectionManager = r2d2::ConnectionManager<Connection>;
pub type Pool = r2d2::Pool<ConnectionManager>;
