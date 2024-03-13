import z from 'zod'

export const zodInputValidation = z.object({
  rows : z.number().min(1).max(100),
  columns : z.number().min(1).max(100),
  animation : z.boolean(),
  algorithmName : z.string().toLowerCase().trim()
});

export function MazeInputValidationFunction(body : any){
  try {
    const validate = zodInputValidation.safeParse(body);
    if(Object.keys(body).length !== 4) {
      return ({success : false, message : "Not exact number of parameters."})
    }
    const { algorithmName } = body;
    if(!validate.success){
      return ({ success : false, message: validate.error})
    }
    if( algorithmName.toLowerCase().split(' ').join('') !== "huntandkill" && algorithmName.toLowerCase().split(' ').join('') !== "recursivebacktracking"){
      return ({success : false , message : "Algorithm does not match. " + algorithmName.toLowerCase().split(' ').join('')})
    }
    return ({success : true, message : "Success"})
  } catch (error) {
    return ({success : false, message : "Error in validation."})
  }
}
