export class Logger {

  static step(message: string) {
    console.log(`\n▶ STEP: ${message}`);
  }

  static apiCall(method: string, endpoint: string, status: number, body?: any) {
    console.log('──────────────────────────────────');
    console.log(`API ${method} ${endpoint}`);
    console.log(`Status: ${status}`);
    if (body) {
      console.log(`Response: ${JSON.stringify(body, null, 2)}`);
    }
    console.log('──────────────────────────────────');
  }

  static uiState(label: string, value: any) {
    console.log(`[UI] ${label}:`, value);
  }

  static error(message: string, error: any) {
    console.error(`\n❌ ERROR: ${message}`, error);
  }

}
