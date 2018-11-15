extern crate actix;
extern crate actix_web;
extern crate chrono;
#[macro_use]
extern crate diesel;
extern crate dotenv;
extern crate failure;
extern crate futures;
extern crate http;
extern crate listenfd;
extern crate serde;
#[macro_use]
extern crate serde_derive;

use std::env;

use actix::prelude::*;
use actix_web::{server, App, AsyncResponder, HttpMessage, HttpRequest, HttpResponse, Json};
use diesel::pg::PgConnection;
use diesel::prelude::*;
use dotenv::dotenv;
use failure::Error;
use futures::prelude::*;
use http::Method;
use listenfd::ListenFd;

mod database;
mod services;

use services::shop::{FetchTidbits, FetchWines, PostOrder, WinesActor};

pub fn establish_db_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url).expect(&format!("Error connecting to {}", database_url))
}

fn fetch_tidbits(req: &HttpRequest<State>) -> Box<Future<Item = HttpResponse, Error = Error>> {
    req.state()
        .wines
        .send(FetchTidbits {})
        .from_err()
        .and_then(|res| match res {
            Ok(user) => Ok(HttpResponse::Ok().json(user)),
            Err(_) => Ok(HttpResponse::InternalServerError().into()),
        }).responder()
}

fn fetch_wines(req: &HttpRequest<State>) -> Box<Future<Item = HttpResponse, Error = Error>> {
    req.state()
        .wines
        .send(FetchWines {})
        .from_err()
        .and_then(|res| match res {
            Ok(user) => Ok(HttpResponse::Ok().json(user)),
            Err(_) => Ok(HttpResponse::InternalServerError().into()),
        }).responder()
}

#[derive(Deserialize)]
struct Order {
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

fn post_order(req: &HttpRequest<State>) -> Box<Future<Item = HttpResponse, Error = Error>> {
    let req = req.clone();
    req.json()
        .from_err()
        .and_then(move |order: Order| {
            req.state()
                .wines
                .send(PostOrder::new(
                    order.firstname.to_owned(),
                    order.lastname.to_owned(),
                    order.street.to_owned(),
                    order.nr.to_owned(),
                    order.zipcode.to_owned(),
                    order.city.to_owned(),
                    order.email.to_owned(),
                    order.telephone.to_owned(),
                    order.fax.to_owned(),
                    order.comment.to_owned(),
                    order
                        .tidbit_ids
                        .clone()
                        .map(|ids| ids.clone())
                        .unwrap_or(vec![]),
                    order
                        .wine_ids
                        .clone()
                        .map(|ids| ids.clone())
                        .unwrap_or(vec![]),
                )).from_err()
        }).and_then(|res| match res {
            Ok(user) => Ok(HttpResponse::Ok().json(user)),
            Err(_) => Ok(HttpResponse::InternalServerError().into()),
        }).responder()
}

struct State {
    wines: Addr<WinesActor>,
}

fn main() {
    let mut listenfd = ListenFd::from_env();
    let mut server = server::new(|| {
        let addr = SyncArbiter::start(3, || WinesActor::new(establish_db_connection()));

        App::with_state(State {
            wines: addr.clone(),
        }).resource("/tidbits", |r| r.method(Method::GET).a(fetch_tidbits))
        .resource("/wines", |r| r.method(Method::GET).a(fetch_wines))
        .resource("/api/orders", |r| r.method(Method::POST).a(post_order))
    });

    server = if let Some(l) = listenfd.take_tcp_listener(0).unwrap() {
        server.listen(l)
    } else {
        server.bind("127.0.0.1:3000").unwrap()
    };

    server.run();
}
