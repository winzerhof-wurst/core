table! {
    customers (id) {
        id -> Int4,
        firstname -> Varchar,
        lastname -> Varchar,
        street -> Varchar,
        nr -> Varchar,
        city -> Varchar,
        telephone -> Varchar,
        fax -> Varchar,
        email -> Varchar,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

table! {
    orders (id) {
        id -> Int4,
        customer_id -> Int4,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

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

joinable!(orders -> customers (customer_id));

allow_tables_to_appear_in_same_query!(
    customers,
    orders,
    tidbits,
    wines,
);
