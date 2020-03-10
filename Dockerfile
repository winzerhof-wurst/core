FROM rust:latest as builder
COPY ./src/dummy.rs /app/src/main.rs
COPY Cargo.toml /app/
COPY Cargo.lock /app/
WORKDIR /app
RUN cargo build --release
COPY . /app
RUN cargo build --release

FROM debian:latest
COPY --from=builder /app/target/release/wiwu_core .
ENTRYPOINT [ "wiwu_core" ]
