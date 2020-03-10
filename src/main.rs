#[macro_use]
extern crate diesel;
#[macro_use]
extern crate log;
#[macro_use]
extern crate serde_derive;

use std::env;
use std::io;

use actix_web::{web, App, Error as AWError, HttpResponse, HttpServer};
use dotenv::dotenv;
use failure::Error;

mod database;
mod services;

async fn fetch_products(db: web::Data<database::Pool>) -> Result<HttpResponse, AWError> {
    match services::shop::fetch_products(&db.get().unwrap()) {
        Ok(tidbits) => Ok(HttpResponse::Ok().json(tidbits)),
        Err(_) => Ok(HttpResponse::InternalServerError().into()),
    }
}

async fn post_order(
    order: web::Json<services::shop::Order>,
    db: web::Data<database::Pool>,
) -> Result<HttpResponse, Error> {
    match services::shop::post_order(order.into_inner(), &db.get().unwrap()) {
        Ok(wines) => Ok(HttpResponse::Ok().json(wines)),
        Err(e) => {
            error!("could not save order {}", e);
            Ok(HttpResponse::InternalServerError().into())
        },
    }
}

async fn save_booking_request(
    order: web::Json<services::booking::BookingRequest>,
) -> Result<HttpResponse, Error> {
    services::booking::save_booking_request(&order.into_inner())?;

    Ok(HttpResponse::Ok().json(None::<i32>))
}

#[actix_rt::main]
async fn main() -> io::Result<()> {
    dotenv().ok();
    env_logger::init();

    let conn_mgr = database::ConnectionManager::new(
        env::var("DATABASE_URL").expect("DATABASE_URL is missing"),
    );
    let pool = database::Pool::new(conn_mgr).unwrap();

    HttpServer::new(move || {
        App::new()
            .data(pool.clone())
            .service(web::resource("/api/products").route(web::get().to(fetch_products)))
            .service(web::resource("/api/orders").route(web::post().to(post_order)))
            .service(web::resource("/api/rooms/book").route(web::post().to(save_booking_request)))
    })
    .bind("0.0.0.0:3000")?
    .run()
    .await
}
