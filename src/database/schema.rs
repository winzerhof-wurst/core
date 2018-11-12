table! {
    tidbits (id) {
        id -> Int4,
        name -> Varchar,
    }
}

table! {
    wines (id) {
        id -> Int4,
        name -> Varchar,
    }
}

allow_tables_to_appear_in_same_query!(
    tidbits,
    wines,
);
