#!/usr/bin/env python3
"""
Convert a phpMyAdmin MySQL dump to PostgreSQL-compatible SQL.
Usage: python3 scripts/mysql_to_postgres.py <input.sql> <output.sql>
"""
import re
import sys


def convert(sql: str) -> str:
    # Handle multi-line ALTER TABLE ... MODIFY ... AUTO_INCREMENT=N BEFORE line-by-line processing
    sql = re.sub(
        r"ALTER TABLE `?(\w+)`?\s+MODIFY `?\w+`? \w+ NOT NULL AUTO_INCREMENT,\s*AUTO_INCREMENT=(\d+);",
        lambda m: f"ALTER SEQUENCE {m.group(1)}_id_seq RESTART WITH {m.group(2)};",
        sql,
        flags=re.IGNORECASE,
    )

    lines = sql.splitlines()
    out = []

    skip_prefixes = (
        "-- phpMyAdmin",
        "-- version",
        "-- https://www.phpmyadmin",
        "-- Host:",
        "-- Generation Time:",
        "-- Server version:",
        "-- PHP Version:",
        "SET SQL_MODE",
        "SET time_zone",
        "/*!40101",
        "/*!40103",
        "/*!40014",
        "/*!40111",
        "-- Database:",
    )

    for line in lines:
        stripped = line.strip()

        # Skip MySQL-specific lines
        if any(stripped.startswith(p) for p in skip_prefixes):
            continue
        if stripped == "START TRANSACTION;":
            continue

        # Remove backticks FIRST (needed before all pattern matching below)
        line = line.replace("`", "")

        # Remove inline charset/collation
        line = re.sub(r"\s+CHARACTER SET \w+", "", line)
        line = re.sub(r"\s+COLLATE \w+", "", line)

        # Remove ENGINE=... DEFAULT CHARSET=... at end of CREATE TABLE
        line = re.sub(
            r"\)\s+ENGINE=\w+.*?;",
            ");",
            line,
            flags=re.IGNORECASE,
        )

        # Data types
        line = re.sub(r"\byear\b", "SMALLINT", line, flags=re.IGNORECASE)
        line = re.sub(r"\bmediumtext\b", "TEXT", line, flags=re.IGNORECASE)
        line = re.sub(r"\btinytext\b", "TEXT", line, flags=re.IGNORECASE)
        line = re.sub(r"\blongtext\b", "TEXT", line, flags=re.IGNORECASE)
        line = re.sub(r"\bfloat\b", "REAL", line, flags=re.IGNORECASE)
        # enum(...) → TEXT
        line = re.sub(r"\benum\([^)]+\)", "TEXT", line, flags=re.IGNORECASE)
        # Remove AUTO_INCREMENT from column definition
        line = re.sub(r"\s+AUTO_INCREMENT\b", "", line, flags=re.IGNORECASE)
        # int → INTEGER
        line = re.sub(r"\bint\b", "INTEGER", line, flags=re.IGNORECASE)

        # DEFAULT '0' for numeric values → DEFAULT 0
        line = re.sub(r"DEFAULT '(\d+)'", r"DEFAULT \1", line)

        # id INTEGER NOT NULL → id SERIAL NOT NULL  (only at start of column def)
        line = re.sub(
            r"^(\s+)(id) INTEGER NOT NULL,",
            r"\1\2 SERIAL NOT NULL,",
            line,
        )

        out.append(line)

    result = "\n".join(out)

    # Wrap everything in a transaction
    result = "BEGIN;\n\n" + result + "\n"

    return result


def main():
    if len(sys.argv) != 3:
        print(f"Usage: {sys.argv[0]} input.sql output.sql")
        sys.exit(1)

    with open(sys.argv[1], "r", encoding="utf-8") as f:
        sql = f.read()

    converted = convert(sql)

    with open(sys.argv[2], "w", encoding="utf-8") as f:
        f.write(converted)

    print(f"Written to {sys.argv[2]}")


if __name__ == "__main__":
    main()
