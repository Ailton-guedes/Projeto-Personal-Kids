export const logsConfig: string[] = [];
const originalLog = console.log;

console.log = (...args: any[]) => {
    const msg = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(' ');

    const timestamp = new Date().toLocaleString();
    const logMessage = `[${timestamp}] ${msg}`;
    
    logsConfig.push(logMessage);
    
    if (logsConfig.length>50) {
        logsConfig.shift();
    }
    
    originalLog.apply(console, args);
};