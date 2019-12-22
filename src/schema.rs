table! {
    customers (id) {
        id -> Int4,
        firstname -> Varchar,
        lastname -> Varchar,
        street -> Varchar,
        nr -> Varchar,
        city -> Varchar,
        zip_code -> Int4,
        country_code -> Bpchar,
        telephone -> Varchar,
        fax -> Varchar,
        email -> Varchar,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

table! {
    order_items (id) {
        id -> Int4,
        order_id -> Int4,
        name -> Varchar,
        wine_id -> Nullable<Int4>,
        tidbit_id -> Nullable<Int4>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

table! {
    orders (id) {
        id -> Int4,
        customer_id -> Int4,
        comment -> Nullable<Text>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

table! {
    tidbits (id) {
        id -> Int4,
        name -> Varchar,
        price -> Int4,
        tax_rate -> Int4,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

table! {
    wines (id) {
        id -> Int4,
        name -> Varchar,
        price -> Int4,
        year -> Int4,
        tax_rate -> Int4,
        #[sql_name = "type"]
        type_ -> Varchar,
        description -> Varchar,
        text -> Varchar,
        unit -> Varchar,
        available -> Bool,
        out_of_stock -> Bool,
        order -> Int4,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

joinable!(order_items -> orders (order_id));
joinable!(order_items -> tidbits (tidbit_id));
joinable!(order_items -> wines (wine_id));
joinable!(orders -> customers (customer_id));

allow_tables_to_appear_in_same_query!(
    customers,
    order_items,
    orders,
    tidbits,
    wines,
);
