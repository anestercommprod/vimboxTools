var agreementButton = document.querySelector("#privacyStatementStatus");
if(localStorage.getItem("agreementStatus_2022_7_0133") == null)
{
    localStorage.setItem("agreementStatus_2022_7_0133", 'false')
}

agreementButton.addEventListener('click', () => {
    localStorage.setItem("agreementStatus_2022_7_0133", agreementButton.checked);
    console.log("is agreed: " + localStorage.getItem("agreementStatus_2022_7_0133"));
});

//fix the localstorage bug
if(localStorage.getItem("agreementStatus_2022_7_0133") == 'true')
{
    agreementButton.checked=true;
}
if(localStorage.getItem("agreementStatus_2022_7_0133") == 'false')
{
    agreementButton.checked=false;
}
console.log(localStorage.getItem("agreementStatus_2022_7_0133"));
console.log(document.getElementById("privacyStatementStatus").checked);