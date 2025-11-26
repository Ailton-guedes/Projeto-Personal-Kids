import { logsConfig as logs } from "../../config/log/logsConfig"

export const logsService = (): string => {
  return `
    <html>
      <body style="background: #1e1e1e; color: #00ff00; font-family: monospace; padding: 20px;" >
        <h2>Terminal Logs - PersonalKids </h2>
        <hr style="border-color: #333;">
        ${logs.map(log => `<div>${log}</div>`).join('')}
        <script>
          setTimeout(() => window.location.reload(), 3000);
        </script>
      </body>
    </html>
  `;
};