#[macro_use]
extern crate diesel;
#[macro_use]
extern crate serde_derive;

use std::env;
use std::io;

use actix_web::{web, App, Error as AWError, HttpResponse, HttpServer};
use dotenv::dotenv;
use failure::Error;

mod database;
mod services;

async fn fetch_tidbits(db: web::Data<database::Pool>) -> Result<HttpResponse, AWError> {
    match services::shop::fetch_tidbits(&db.get().unwrap()) {
        Ok(tidbits) => Ok(HttpResponse::Ok().json(tidbits)),
        Err(_) => Ok(HttpResponse::InternalServerError().into()),
    }
}

async fn fetch_wines(db: web::Data<database::Pool>) -> Result<HttpResponse, Error> {
    match services::shop::fetch_wines(&db.get().unwrap()) {
        Ok(wines) => Ok(HttpResponse::Ok().json(wines)),
        Err(_) => Ok(HttpResponse::InternalServerError().into()),
    }
}

async fn post_order(
    order: web::Json<services::shop::Order>,
    db: web::Data<database::Pool>,
) -> Result<HttpResponse, Error> {
    match services::shop::post_order(order.into_inner(), &db.get().unwrap()) {
        Ok(wines) => Ok(HttpResponse::Ok().json(wines)),
        Err(_) => Ok(HttpResponse::InternalServerError().into()),
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
    dotenv().unwrap();
    let conn_mgr = database::ConnectionManager::new(
        env::var("DATABASE_URL").expect("DATABASE_URL is missing"),
    );
    let pool = database::Pool::new(conn_mgr).unwrap();

    HttpServer::new(move || {
        App::new()
            .data(pool.clone())
            .service(web::resource("/api/tidbits").route(web::get().to(fetch_tidbits)))
            .service(web::resource("/api/wines").route(web::get().to(fetch_wines)))
            .service(web::resource("/api/orders").route(web::post().to(post_order)))
            .service(web::resource("api/rooms/book").route(web::post().to(save_booking_request)))
    })
    .bind("127.0.0.1:3000")?
    .start()
    .await
}
