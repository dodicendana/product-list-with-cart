import configurations from "../configurations/configurations"; 

export const logging = (logValue) => {
    const config = configurations[configurations.BUILD];
    if(config.logging) {
        console.log("Logging: ", logValue);
    }
}