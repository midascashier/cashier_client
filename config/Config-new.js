/**
 * Rabbit Credentials
 */
let rabbitC = new Map();
rabbitC.set("ip","10.0.223.142");
rabbitC.set("port","15674");
rabbitC.set("user","midas");
rabbitC.set("pass","midas");
rabbitC.set("virtual","vh");
export let rabbitConfig = rabbitC;

let configP = new Map();
configP.set("url","http://poker.new:8080/c.php");
export let Config = configP;