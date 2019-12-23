FROM rust:latest as builder
COPY . /app
WORKDIR /app
RUN cargo build --release

FROM debian:latest
COPY --from=builder /app/target/release/wiwu_core .
ENTRYPOINT [ "wiwu_core" ]
