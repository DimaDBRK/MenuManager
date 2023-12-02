# Restaurant Menu Manger
![Logo](/docs/menulogo.png)
# Task Description: 

Create an input form and categories for menu items. 
Ensure authorized access to the menu item addition page, editing, and uploading images from the user's PC.
Develop a data storage table, place menu items and categories in the table. It may be necessary to use more than one table; there are no limitations here.
In the end, the following should be achieved: a website on the proposed stack with data storage in the database. The site should have two sections - one for viewing the menu, and the other for editing.

## Web Service Overview

The application allows viewing and editing the restaurant menu through a web interface.

- Frontend: React + Axios
- Backend: Node.js + PostgreSQL + Prisma
- Authentication System: JWT-based

Demo video: TBC

![Menu](/docs/menuScreen.png)
## Table of Contents

- [Restaurant Menu Manger](#restaurant-menu-manger)
- [Task Description:](#task-description)
  - [Web Service Overview](#web-service-overview)
  - [Table of Contents](#table-of-contents)
  - [Database](#database)

## Database

Prisma automates every part of setup and running of PostgreSQL clusters.
For details check backend - prisma - schema.prisma
There are Tables:


model Item {
  id          Int      @id @default(autoincrement())
  title       String   @db.VarChar(255) @unique
  description String?  @db.VarChar(1000)
  price       Float
  category    Category? @relation(fields: [categoryId], references: [id])
  categoryId  Int? 
  author      User     @relation(fields: [authorId], references: [id])
  authorId    String
  pictureUrl  String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt @db.Timestamptz(6)
}

model Category {
  id    Int     @id @default(autoincrement())
  title String  @unique
  items Item[]
}

model User {
  id        String    @id @default(cuid())
  email     String    @unique
  name      String?
  password  String
  createdAt DateTime  @default(now()) @db.Timestamptz(6)
  updatedAt DateTime @updatedAt @db.Timestamptz(6)
  items     Item[]
  tokens    Token[]
}

model Token {
  id        String    @id @default(cuid())
  token     String    @unique
  userId    String
  user      User      @relation(fields: [userId], references: [id])
  createdAt DateTime  @default(now()) @db.Timestamptz(6)
}
