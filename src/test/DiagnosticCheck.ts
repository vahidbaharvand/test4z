import { Test4zService, DiagnosticResult } from "@broadcom/test4z";
async function main() {
    const diagnostic = await Test4zService.diagnostic();
    diagnostic && diagnostic.data ? console.table(diagnostic.data) : console.log(diagnostic)
}
main();
