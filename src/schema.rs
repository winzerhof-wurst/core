table! {
    customers (id) {
        id -> Int4,
        firstname -> Varchar,
        lastname -> Varchar,
        street -> Varchar,
        nr -> Varchar,
        city -> Varchar,
        zipcode -> Int4,
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
        price -> Int4,
        tax_rate -> Int4,
        product_id -> Int4,
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
    products (id) {
        id -> Int4,
        name -> Varchar,
        price -> Int4,
        year -> Nullable<Int4>,
        tax_rate -> Int4,
        #[sql_name = "type"]
        type_ -> Varchar,
        description -> Varchar,
        text -> Nullable<Varchar>,
        unit -> Varchar,
        available -> Bool,
        out_of_stock -> Bool,
        order -> Int4,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

joinable!(order_items -> orders (order_id));
joinable!(order_items -> products (product_id));
joinable!(orders -> customers (customer_id));

allow_tables_to_appear_in_same_query!(
    customers,
    order_items,
    orders,
    products,
);
