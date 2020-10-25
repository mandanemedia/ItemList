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

## install packages

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

```
cd client
npm start
```

# React Screen Shot 
![React](screenshot.png)