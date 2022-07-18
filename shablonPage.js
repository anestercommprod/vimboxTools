let newResults, results;
let selectorElement;
let newString = '#UDF';
let newSelectorOptionName;

var sheetId = '1vSY4mgMXcwP05RmnTd9uUpSyOyrxjZ_bYmHb3zsDVwg';
var curShablon_index = 1;
var maxShablon_index = 3;

var selectorOptionChecker = document.getElementById("selectorOption_1");

// pre-initializing agreement
document.getElementById("agreementLinker").onclick = function()
{
    chrome.windows.create({'url': '/support/privacyStatements.html', 'type': 'popup'}, function(window) {});
}

// adding variables to cache
if(localStorage.getItem('tools_showLegacyToolsStatus') == null)
{
    localStorage.setItem('tools_showLegacyToolsStatus', 'false');
    document.getElementById('tools_showLegacyTools_checkbox').checked = false;
}
if(localStorage.getItem('agreementStatus_2022_7_0133') == null)
{
    localStorage.setItem('agreementStatus_2022_7_0133', 'true');
    alert('Расширение Vimbox Tools v2022.7.0133 было установлено впервые либо сброшено. \nЛицензионое соглашение на использование ПО автоматически подписано. \nПодробно ознакомиться с лицензией пользования можно ознакомиться в пункте "#Справка" > "Заявления конфиденцииальности".');
}
if(localStorage.getItem('agreementStatus_2022_7_0133') == 'false'){
    document.getElementById("declinedAgreement").style = "display: block; height: 144px;";
    document.getElementById("mainPage").style = "display: none;";
}
if(localStorage.getItem('agreementStatus_2022_7_0133') == 'true'){
    document.getElementById("declinedAgreement").style = "display: none;";
    document.getElementById("mainPage").style = "display: block;";
}
if(localStorage.getItem("tools_googleSpreadSheetHash") != null)
{
    sheetId = localStorage.getItem("tools_googleSpreadSheetHash");
}
console.log(localStorage.getItem('agreementStatus_2022_7_0133'));


document.getElementById('techSup_adminLinks').onclick =  function()
{
    alert('Этот пункт пока всё еще в разработке.');
}

setTimeout(function()
        {   
            document.getElementById('agreeWithoutReading').style = "";
        }, 4400);
setTimeout(function()
{   
    document.getElementById('checkAgreementStatus').style = "";
}, 8400);
document.getElementById('agreeWithoutReading').onclick = function()
{
    localStorage.setItem('agreementStatus_2022_7_0133', 'true');   
    reloadDoom();
}
document.getElementById('checkAgreementStatus').onclick = function(){
    reloadDoom();
}
function reloadDoom()
{
    if(localStorage.getItem('agreementStatus_2022_7_0133') == 'true')
    {
        location.reload();
    }
    if(localStorage.getItem('agreementStatus_2022_7_0133') == 'false')
    {
        alert('Соглашение не подписано / не прочитано. Доступ будет открыт только после подписания соглашения.');
    }
}


// main-page / shablons
function init() {
	const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
	const sheetName = 'user-data';
	const query = encodeURIComponent('Select *')
	const request = `${base}&sheet=${sheetName}&tq=${query}`

    fetch(request, {})
        .then(res => res.text())
        .then(rep => {
            results = JSON.parse(/(?<=\()(.*?)(?=\);)/.exec(rep)[0]);
            newResults = results;
        })
};


function addSelectorOption(){   
    selectorElement = document.getElementById('techSup_shablony_selector'); 

    try
    {
        for (var i = 1; i<=maxShablon_index; i++){
            curShablon_index = i;
    
            if(newResults == null)
            {
                init();
            }
    
            newSelectorOptionName = newResults.table.rows[curShablon_index].c[1].v;
            var opt = document.createElement('option');
            opt.value = newSelectorOptionName + "_" + i;
            opt.innerHTML = newSelectorOptionName;
            opt.id = "selectorOption_" + i;
            selectorElement.appendChild(opt);

            console.log(i);
        }
    }
    catch(e)
    {
        document.getElementById("curShablonText").innerHTML = 'произошла ошибка при парсинге, попробуй ещё раз. <br><br>Если не помогло, сбрось расширение перейдя в "Инструменты".';

        var opt = document.createElement('option');
        opt.value = newSelectorOptionName + "_" + 1;
        opt.innerHTML = '#UDF!';
        opt.id = "selectorOption_" + 1;
        selectorElement.appendChild(opt);
    }
};

function checkCurrentSelectorState(){
    selectorElement.options[selectorElement.selectedIndex].value;

    selectorElement.addEventListener('change', function() 
    {
        curShablon_index = this.selectedIndex + new Number(1);
        console.log('You selected: ', curShablon_index);
        document.getElementById("curShablonText").innerHTML = results.table.rows[curShablon_index].c[0].v;
    });

    document.getElementById("curShablonText").innerHTML = results.table.rows[curShablon_index].c[0].v;
}




document.getElementById("techSup_shablony_bigText").onclick = function()
{
    document.getElementById("mainPage").style = "display: block;";
    document.getElementById("tsScripts").style = "display: none;";
    document.getElementById("tsInstruments").style = "display: none;";
}
document.getElementById("techSup_instruments_bigText").onclick = function()
{
    document.getElementById("mainPage").style = "display: block";
    document.getElementById("tsScripts").style = "display: none;";
    document.getElementById("tsInstruments").style = "display: none;";
}
document.getElementById("techSup_scripts").onclick = function()
{
    removePrevoiusOptionsFromSelector();

    document.getElementById("mainPage").style = "display: none;";
    document.getElementById("tsScripts").style = "";
    document.getElementById("tsInstruments").style = "display: none;";
    
    setTimeout(function()
    {   
        init();
    }, 50);

    setTimeout(function()
    {   
        addSelectorOption();
    }, 500);
    setTimeout(function(){
        curShablon_index = 1;
        checkCurrentSelectorState();
    }, 600);
}
document.getElementById("techSup_instruments").onclick = function()
{

    document.getElementById("mainPage").style = "display: none;";
    document.getElementById("tsScripts").style = "display: none;";
    document.getElementById("tsInstruments").style = "vertical-align: top;";
}

document.getElementById("techSup_help").onclick = function()
{
    chrome.windows.create({ type: 'panel', url: "support/help.html"});
}



function removePrevoiusOptionsFromSelector()
{
    for (let i = 1; i < maxShablon_index+Number(1); i++) 
    {
        if(document.getElementById('selectorOption_'+i))
        {
            document.getElementById('selectorOption_'+i).remove();
        }
    }

    document.getElementById('curShablonText').innerHTML = 'fetching...';
}






document.getElementById("techSup_shablony_theme").onclick = function()
{
    newString = document.getElementById("listTheme").innerText;
    copyStringToClipboard(newString);
    alert("Скопировано в буфер обмена: \n\n\n" + newString);
}
document.getElementById("techSup_shablony_list").onclick = function()
{
    newString = document.getElementById("techSup_shablony_list").innerText;
    copyStringToClipboard(newString);
    alert("Скопировано в буфер обмена: \n\n\n" + newString);
}

document.getElementById("button_copy").onclick = function()
{
    init();
    newString = document.getElementById("curShablonText").innerText;
    copyStringToClipboard(newString);
    alert("Скопировано в буфер обмена: \n\n\n" + newString);
}



document.getElementById("tsInst_addStudent").onclick = function()
{
    if(document.getElementById("tsInst_studentID").value != "")
    {
        newString = "https://profile.skyeng.ru/profile/" + tsInst_studentID.value + "/showcase";
        copyStringToClipboard(newString);
        alert("Скопировано в буфер обмена: \n\n\n" + newString);
    }
    else
    {
        alert("#UDF_STUDENT_ID_NOT_FOUND");
    }
}
document.getElementById("tsInst_removeLinkHandler").onclick = function()
{
    if(document.getElementById("tsInst_removeLinkHandlerInput").value != "")
    {
        newString = document.getElementById("tsInst_removeLinkHandlerInput").value;

        if(newString.includes('/customer-support/task/'))
        {
            let test = newString;
            let arr = test.split("/");
            let res = arr[0] + '/' + arr[1] + '/' + arr[2] + '/' +arr[3] + '/' + arr[4] + '/' + 'customer-support/list';

            
            copyStringToClipboard(res);
            alert("Скопировано в буфер обмена: \n\n\n" + res);

            alert(res);
        }
        else
        {
            alert("#LINK_NOT_FOUND");
        }
    }
}
document.getElementById("tsInst_removeCanEdit").onclick = function()
{
    if(document.getElementById("tsInst_removeCanEditInput").value != "")
    {
        newString = document.getElementById("tsInst_removeCanEditInput").value;

        if(newString.includes("Can edit"))
        {
            newString = newString.replace("Can edit", ', ');
            newString = newString.replace("         ", "");
        }
        if(newString.includes("Can edit"))
        {
        newString = newString.replace("Can edit", ', ');
        newString = newString.replace("         ", "");
        }
        if(newString.includes("Can edit"))
        {
        newString = newString.replace("Can edit", ', ');
        newString = newString.replace("         ", "");
        }
        if(newString.includes("Can edit"))
        {
        newString = newString.replace("Can edit", ', ');
        }
        if(newString.includes("Can edit"))
        {
        newString = newString.replace("Can edit", ', ');
        }
        if(newString.includes("Can edit"))
        {
        newString = newString.replace("Can edit", ', ');
        }
        if(newString.includes("Can edit"))
        {
        newString = newString.replace("Can edit", ', ');
        }
        if(newString.includes("Can edit"))
        {
        newString = newString.replace("Can edit", ', ');
        }
        if(newString.includes("Can edit"))
        {
        newString = newString.replace("Can edit", ', ');
        }

        copyStringToClipboard(newString);
        alert("Скопировано в буфер обмена: \n\n\n" + newString);
    }
    else
    {
        alert("#UDF_STUDENT_ID_NOT_FOUND");
    }
    
}

//test-users
function resetTools()
{
    localStorage.removeItem('tools_testUser_student');
    localStorage.removeItem('tools_testUser_teacherVimbox');
    localStorage.removeItem('tools_testUser_teacherSkysmart');
    localStorage.removeItem('tools_googleSpreadSheetHash');
    localStorage.removeItem('agreementStatus_2022_7_0133');
    localStorage.removeItem('tools_showLegacyToolsStatus');
}
function initTools()
{
    if(localStorage.getItem("tools_testUser_student") == null){
        localStorage.setItem("tools_testUser_student", '');
    }
    if(localStorage.getItem("tools_testUser_teacherVimbox") == null){
        localStorage.setItem("tools_testUser_teacherVimbox", '');
    }
    if(localStorage.getItem("tools_testUser_teacherSkysmart") == null){
        localStorage.setItem("tools_testUser_teacherSkysmart", '3622918');
    }
    if(localStorage.getItem("tools_googleSpreadSheetHash") == null){
        localStorage.setItem("tools_googleSpreadSheetHash", '1vSY4mgMXcwP05RmnTd9uUpSyOyrxjZ_bYmHb3zsDVwg');
    }

    document.getElementById('tsInst_testStudentID').value = localStorage.getItem("tools_testUser_student");
    document.getElementById('tsInst_testTeacherVimboxID').value = localStorage.getItem("tools_testUser_teacherVimbox");
    document.getElementById('tsInst_testTeacherSkysmartID').value = localStorage.getItem("tools_testUser_teacherSkysmart");
    document.getElementById('tsInst_googleSpreadSheetHash').value = localStorage.getItem("tools_googleSpreadSheetHash");
    sheetId = localStorage.getItem("tools_googleSpreadSheetHash");

    if(localStorage.getItem('tools_showLegacyToolsStatus') == 'false')
    {
        document.getElementById('tools_deprecatedTools').style = "display: none;";
        document.getElementById('tools_showLegacyTools_checkbox').checked = false;
    }
    if(localStorage.getItem('tools_showLegacyToolsStatus') == 'true')
    {
        document.getElementById('tools_showLegacyTools_checkbox').checked = true;
    }
} initTools();
function saveTools()
{
    localStorage.setItem("tools_testUser_student", document.getElementById('tsInst_testStudentID').value);
    localStorage.setItem("tools_testUser_teacherVimbox", document.getElementById('tsInst_testTeacherVimboxID').value);
    localStorage.setItem("tools_testUser_teacherSkysmart", document.getElementById('tsInst_testTeacherSkysmartID').value);
    localStorage.setItem("tools_googleSpreadSheetHash", document.getElementById('tsInst_googleSpreadSheetHash').value);
}
document.getElementById('tools_saveButton').onclick = function()
{
    saveTools();

    alert('Изменения сохранены. \nЕсли что-то не работает, нужно переоткрыть расширение. \n\nВ случае если ничего не меняется, зайти в раздел "Инструменты" и нажать на кнопку "сбросить".')
}
document.getElementById('tools_resetButton').onclick = function()
{
    resetTools();
    initTools();

    alert('Успешный возврат к заводским настройкам.')
}

// tools-tips
document.getElementById('tools_showLegacyTools_checkbox').onclick = function()
{
    setTimeout(function(){
        localStorage.setItem("tools_showLegacyToolsStatus", document.getElementById('tools_showLegacyTools_checkbox').checked);
        console.log(localStorage.getItem('tools_showLegacyToolsStatus'));
        initTools();
    }, 64);
}







function copyStringToClipboard (str) {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand("copy");
    // Remove temporary element
    document.body.removeChild(el);
 }
