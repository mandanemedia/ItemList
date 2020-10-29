# Setup Express and React to fetch data from Giphy

## Assumptions 

- If list does not exist, create new list with a prompt that new list is created
- Add new item to the list
- remove new item from the list
- Items can be reordered 
- The list can be reset
- It is autosave after each action, such as reorder and update the description
- Added item should immediately appear in list with a pending mark. The mark should dissapear as soon as server confirms successful add
- There should be a retry on failed saves (it is not implemnted to save time)
- Server should respond with proper error messages when there is an issue
- Share type definitions between backend and frontend

# ER Diagrams
- List has id 
- Item has description, order and id

# Install and start postgress
```
brew install postgresql
brew services start postgresql
```
Set user name and DB name for Postgress on config/db.ts

```
postgres=# \du
```
Then, create a database and import itemlist.sql into the new database.

## Install packages

```
cd api
npm install
```

```
cd client
npm install
```

## Run

```
cd api
npm run dev
```
Then visit http://localhost:3000/swagger/#

```
cd client
npm start
```

# Screenshots 
![DB Schema](DBSchema_.png)
![Swagger](Swagger_.png)

# UI Video 
https://drive.google.com/file/d/1YfoMXRX32lKDngewdCXw2wDyxaZPGkem/view?usp=sharing


# Todo
- prompt user that a new list is created
- Added item should immediately appear in list with a pending mark. The mark should dissapear as soon as server confirms successful add
- There should be a retry on failed saves
- Server should respond with proper error messages when there is an issue
- Written in Typescript and share type definitions between backend and frontend
- Add Better error handeling for BE i.e. if cannot set non unique order in DB 
- Add unit test for Backend 
- Add unit test for frontend