# Documentation of Backend Server

Holds the server documentation of the [repo - shrutsureja/Maze-Game](https://github.com/shrutsureja/Maze-Game)

## Algorithms Used

Currently only responds to 2 maze generation algorithm.

-   Hunt and Kill
-   Recursive Backtracking

## API routes

Contains input and output details of the API routes of the server.

### { route method : route name }

#### Body

```json
	body : {
		// contains the data
	}
```

#### Response

**Status Code : {number}**

```json
{
	// response structure
}
```

`Example`

```json
{
	// example response data
}
```

### POST /api/generate

#### Body

    rows: number,
    columns: number,
    animation: boolean,
    algorithmName: String 'Hunt and kill' or 'Recursion'.

#### Response

    maze: {2d array of cells},
    solutionPath: {array of {row: number, column: number}},
    generatedMazePath: {array of {row: number, column: number}}
