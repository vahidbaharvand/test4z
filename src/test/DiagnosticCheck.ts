import { Test4zService, DiagnosticResult } from "test4z-sdk";
async function main() {
    const diagnostic = await Test4zService.diagnostic();
    diagnostic && diagnostic.data ? console.table(diagnostic.data) : console.log(diagnostic)
}
main();
