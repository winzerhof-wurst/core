use actix::prelude::*;
use diesel::prelude::*;
use failure::Error;

use database::models::{Tidbit, Wine};

pub struct WinesActor(PgConnection);

impl WinesActor {
    pub fn new(conn: PgConnection) -> Self {
        WinesActor(conn)
    }
}

impl Actor for WinesActor {
    type Context = SyncContext<Self>;
}

pub struct FetchTidbits {}
pub struct FetchWines {}

impl Message for FetchTidbits {
    type Result = Result<Vec<Tidbit>, Error>;
}

impl Message for FetchWines {
    type Result = Result<Vec<Wine>, Error>;
}

impl Handler<FetchTidbits> for WinesActor {
    type Result = Result<Vec<Tidbit>, Error>;

    fn handle(&mut self, _msg: FetchTidbits, _: &mut Self::Context) -> Self::Result {
        use database::schema::tidbits::dsl::*;

        tidbits.load(&self.0).map_err(Error::from)
    }
}

impl Handler<FetchWines> for WinesActor {
    type Result = Result<Vec<Wine>, Error>;

    fn handle(&mut self, _msg: FetchWines, _: &mut Self::Context) -> Self::Result {
        use database::schema::wines::dsl::*;

        wines.load(&self.0).map_err(Error::from)
    }
}
