import express, { Request, Response, NextFunction } from "express";
import { GenerateMaze } from "./Maze/GenerateMaze";
import z from "zod";

// const express =  require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

const inputValidation = z.object({
  rows : z.number().min(1).max(100),
  columns : z.number().min(1).max(100),
  animation : z.boolean(),
  algorithmName : z.string().toLowerCase().trim()
})
//middleware
function MazeInputValidation(req : Request, res  :Response, next : NextFunction) {
  if(!req.body) {
    res.status(400);
    res.json({msg: 'Please enter all the fields'});
  }
  const validate = inputValidation.safeParse(req.body);
  if (!validate.success){
    res.status(400).json(validate.error);
  }
  const { algorithmName } = req.body;
  if( algorithmName.toLowerCase().split(' ').join('') !== "huntandkill" && algorithmName.toLowerCase().split(' ').join('') !== "recursivebacktracking"){
    res.status(400).json({success : false , msg : "Algorithm does not match." + algorithmName.toLowerCase().split(' ').join('')})
  }
  next();
}

/**
 * @route GET /generate
 * @desc Generate a new maze and return the json as required
 * @access Public
 * @returns {JSON} - The generated maze
 * @body {algorithmName: string, rows : number, columns: number, animation:boolean}
 * @returns {
 *  maze: {2d array of cells},
 *  solutionPath: {array of {row: number, column: number}},
 *  generatedMazePath: {array of {row: number, column: number}}
 * }
 */
app.get('/generate', MazeInputValidation, (req : Request, res : Response)=> {
  const {algorithmName, rows, columns, animation} = req.body;
  try{
    const MazeObj = new GenerateMaze(rows, columns);
    const MazeGrid = MazeObj.generateNewMaze(algorithmName.toLowerCase().split(' ').join(''), animation);
    // do the conversion of the maze, maze solution and the animation path to json over here 
    res.status(200).json({success : true, data : MazeGrid});
  }
  catch(e){
    res.status(500).json(`error -> ${e}`);
  }
  finally{
    console.log("Reached finally");
  }
})

app.listen(PORT, ()=> {
  console.log(`Server is running on port ${PORT}`);
});