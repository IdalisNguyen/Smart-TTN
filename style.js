const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});


const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const tab = $$('.tab-item')
const dashboards = $$('.dashboard')

tab.forEach((tab, index) => {
    const dashboard = dashboards[index]

    tab.onclick = function () {
        $('.tab-item.active').classList.remove('active')
        $('.dashboard.active').classList.remove('active')

        this.classList.add('active')
        dashboard.classList.add('active')
    }
})

const tab_infor=$$('.tab_infor')
const show_infors=$$('.pro-tablee')

tab_infor.forEach((tab,indexx)=>{

    const show_infor=show_infors[indexx]

    tab.onclick=function(){
        $('.tab_infor.activee').classList.remove('activee')
        $('.pro-tablee.activee').classList.remove('activee')

        this.classList.add('activee')
        show_infor.classList.add('activee')

    }
})










// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})










const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');
switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})

//bao cao hien trang phong hoc
var data = []
let us_accounts = [
    { username: "21103000", password: "21103000", email: "21103000@sv.ttn.edu.vn" },
    { username: "21103001", password: "21103001", email: "21103001@sv.ttn.edu.vn" },
];  
function add() {     //summit_btn ="onclick"
    
    if(cur_account=='noAccount'){
        alert("Đăng nhập để gửi phản ánh!")
    }
    else if(document.getElementById("muc-do").value == ''){
        alert('Nhập Mức Độ!');
    }
    else{
        var id = document.getElementById("id_item").value
        var item_khu_vuc = document.getElementById("khu-vuc").value
        var item_muc_do = document.getElementById("muc-do").value
        var item_trang_thai = document.getElementById("trang-thai").value
        var item_tinh_trang = document.getElementById("tinh-trang").value
    
    
        //biến item:
        var item = {
            accountId: cur_account,
            id: id,
            khu_vuc: item_khu_vuc,
            muc_do: item_muc_do,
            trang_thai: item_trang_thai,
            tinh_trang: item_tinh_trang,
        }
    
        item.tinh_trang="Chưa duyệt"
        //xử lý để thêm/sửa
        if (id == "") {       //ô STT rỗng =>thêm, KHÔNG phải chỉnh sửa
            data.push(item)
        } else {                  // ô STT có dữ liệu => chỉnh sửa dữ liệu
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == id) {      //tìm đc vị trí chèn dữ liệu
                    // console.log(item.tinh_trang)
                    data.splice(i, 1, item)       //xóa tại i 1 phần tử, thêm item vào thay thế
                }
            }
            clear()
        }
    
        render()
        clear()
    }

}

function render() {      //hàm show data ra màng hình
    table = `<tr>
                <th>STT</th>
                <th>ID</th>
                <th>Khu vực</th>
                <th>Mức độ</th>
                <th>Trạng thái</th>
                <th>Tác vụ</th>
            </tr>`

    for (let i = 0; i < data.length; i++) {     //set stt cho các item đc thêm mới
        data[i].id = i + 1
    }
    let stt=1;
    for (let i = 0; i < data.length; i++) {
        if(cur_account==data[i].accountId && cur_account!='admin'){
            table+=`<tr>
                    <th>${stt}</th>
                    <th>${data[i].id}</th>
                    <th>${data[i].khu_vuc}</th>
                    <th>${data[i].muc_do}</th>
                    <th>${data[i].trang_thai}</th>
                    <th class="button-hidden">
                        <button class="edit_btn" onclick="deleteItem(${data[i].id})">Xóa</button>
                        <button class="edit_btn" onclick="editItem(${data[i].id})">Chỉnh sửa</button><br>
                        <span class="tinh_trang_sp">${data[i].tinh_trang}</span>
                    </th>
                </tr>`
            stt++;
        }else if(cur_account=="admin"){
            table += `<tr>
                    <th>${stt}</th>
                    <th>${data[i].id}</th>
                    <th>${data[i].khu_vuc}</th>
                    <th>${data[i].muc_do}</th>
                    <th>${data[i].trang_thai}</th>
                    <th class="button-hidden">
                        <button class="edit_btn" onclick="deleteItem(${data[i].id})">Xóa</button>
                        <button class="edit_btn" onclick="editItem(${data[i].id})">Chỉnh sửa</button>
                        <button class="edit_btn tinh_trang_btn" onclick="acceptItem(${data[i].id})">${data[i].tinh_trang}</button><br>
                    </th>
                </tr>`
            stt++;
        }

    }

    document.getElementById("render").innerHTML = table
    //------------------------------------------------------------------------------
    table2 = ``
    let stt2=1;
    for (let i = 0; i < data.length; i++) {
        if(cur_account==data[i].accountId){
            table2 += `
                <div class="boder_minishow">
                    <table class="minishow_recomend">
                        <thead>
                            <tr>
                                <th>
                                    <div class="lefttitle_minishow">${data[i].khu_vuc}</div>
                                    <div class="righttitle_minishow">${data[i].muc_do}</div>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <h4>Trạng thái: ${data[i].tinh_trang} <br> ${data[i].trang_thai}</h4>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <div class="title_minishow">
                                        <span>STT: ${stt2}</span>
                                        <button class="button_minishow"
                                            onclick="deleteItem(${data[i].id})">Xóa</button>
                                        <button class="button_minishow" 
                                            onclick="editItem(${data[i].id})">Chỉnh sửa</button>
                                        <span>ID: ${data[i].id}</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>`
            stt2++;
        }else if(cur_account=="admin"){
            table2 += `
                <div class="boder_minishow">
                    <table class="minishow_recomend">
                        <thead>
                            <tr>
                                <th>
                                    <div class="lefttitle_minishow">${data[i].khu_vuc}</div>
                                    <div class="righttitle_minishow">${data[i].muc_do}</div>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <h4>Trạng thái: ${data[i].tinh_trang} <br> ${data[i].trang_thai}</h4>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <div class="title_minishow">
                                        <span>STT: ${stt2}</span>
                                        <button class="button_minishow"
                                            onclick="deleteItem(${data[i].id})">Xóa</button>
                                        <button class="button_minishow" 
                                            onclick="editItem(${data[i].id})">Chỉnh sửa</button>
                                        <button class="button_minishow tinh_trang_btn"
                                            onclick="acceptItem(${data[i].id})">${data[i].tinh_trang}</button><br>
                                        <span>ID: ${data[i].id}</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>`
            stt2++;
        }

    }
    document.getElementById("render2").innerHTML = table2
    //------------------------------------------------------------------------------
    let count_da_duyet = 0;
    for(let i=0;i<data.length;i++){
        if(data[i].tinh_trang=="Đã duyệt"){
            count_da_duyet++;
        }
    }
    document.getElementById("so_luong_phan_hoi").innerHTML = data.length;
    document.getElementById("da-tiep-nhan").innerHTML = data.length;      
    document.getElementById("da-xu-ly").innerHTML = count_da_duyet;
    //-------------------------------------------------------------------------------
    var levels=[]
    for(let i=0; i<data.length;i++){
        if(levels.includes(data[i].muc_do)){

        }else{
            levels.push(data[i].muc_do)
        }
    }

    var table3=``
    for(let i=0;i<levels.length;i++){
        var table4=``
        var count_severity=0;
        let stt3=1;
        for(let j=0;j<data.length;j++){
            if(data[j].muc_do==levels[i]){
                count_severity++;
                table4+=`
                <div class="boder_minishow">
                    <table class="minishow_recomend">
                        <thead>
                            <tr>
                                <th>
                                    <div class="lefttitle_minishow">${data[j].khu_vuc}</div>
                                    <div class="righttitle_minishow">${data[j].muc_do}</div>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <h4>Trạng thái: ${data[j].tinh_trang} <br> ${data[j].trang_thai}</h4>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <div class="title_minishow">
                                        <span>STT: ${stt3}</span>
                                        <button class="button_minishow"
                                            onclick="deleteItem(${data[j].id})">Xóa</button>
                                        <button class="button_minishow" 
                                            onclick="editItem(${data[j].id})">Chỉnh sửa</button>
                                        <button class="button_minishow tinh_trang_btn"
                                            onclick="acceptItem(${data[j].id})">${data[j].tinh_trang}</button><br>
                                        <span>ID: ${data[j].id}</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>`
            }
        }
        table3+=`
            <div class="severity_box">
                <div class="severity">
                    <span>Mức độ: ${levels[i]} | Số lượng: ${count_severity}</span>
                </div>
                <div class="reflect_box">
                    <!--insert items here-->
                    ${table4}
                </div>
            </div>
            <hr>
        `
    }
    document.getElementById('statistical').innerHTML=table3
}
function acceptItem(id){
    for(let i=0;i<data.length;i++){
        if(data[i].id==id){
            data[i].tinh_trang="Đã duyệt"
        }
    }

    render()
}
function clear() {       //xóa dữ liệu đang nhập
    document.getElementById("id_item").value = ""
    document.getElementById("khu-vuc").value = ""
    document.getElementById("muc-do").value = ""
    document.getElementById("trang-thai").value = ""
    document.getElementById("tinh-trang").value = ""
}

function deleteItem(id) {   //hàm xóa phần tử tại vị trí STT
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            data.splice(i, 1)
            render()        //sắp xếp lại stt sau khi xóa
        }
    }
}

function editItem(id) {     //hàm chỉnh sửa phần tử
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            document.getElementById("id_item").value = data[i].id
            document.getElementById("khu-vuc").value = data[i].khu_vuc
            document.getElementById("muc-do").value = data[i].muc_do
            document.getElementById("trang-thai").value = data[i].trang_thai
            document.getElementById("tinh-trang").value = data[i].tinh_trang
        }
    }
}

// Function to open the login form
function openLoginForm() {
    document.getElementById("loginForm").style.display = "block";
}

// Function to close the login form
function closeLoginForm() {
    document.getElementById("loginForm").style.display = "none";
}

// Close the form when the user clicks anywhere outside of it
window.onclick = function (event) {
    if (event.target == document.getElementById("loginForm")) {
        closeLoginForm();
    }
}


var ad_accounts = [
    { username: "huuphuoc", password: "21103079", email: "huuphuoc@sv.ttn.edu.vn" },
    { username: "thanhtam", password: "21103189", email: "thanhtam@sv.ttn.edu.vn" },
];  

document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Ngăn chặn form được gửi đi và tải lại trang

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Tìm tài khoản trong mảng ad_accounts có username và password trùng với giá trị đầu vào
    const matchedAdAccount = ad_accounts.find((account) => {
        return account.username === usernameInput.value && account.password === passwordInput.value;
    });
    const matchedUsAccount = us_accounts.find((account) => {
        return account.username === usernameInput.value && account.password === passwordInput.value;
    });

    if (matchedAdAccount) {
        // Nếu tìm thấy tài khoản, hiển thị thông báo đăng nhập thành công
        alert('Đăng nhập thành công tài khoản Admin!');
        // Đặt lại dữ liệu đã nhập bằng rỗng:
        usernameInput.value = '';
        passwordInput.value = '';
        logInAdmin();
        clear();
        closeLoginForm();
        show_thong_ke();
        render();
    } else if(matchedUsAccount){
        alert('Đăng nhập thành công!');
        logInUser(usernameInput.value);
        usernameInput.value = '';
        passwordInput.value = '';
        clear();
        closeLoginForm();
    }else {
        // Nếu không tìm thấy tài khoản, hiển thị thông báo đăng nhập thất bại
        alert('Đăng nhập thất bại! Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.');
        usernameInput.value = '';
        passwordInput.value = '';
        // Định vị lại vị trí con trỏ chuột ở ô tài khoản
        usernameInput.focus();
    }
});

var cur_account='noAccount';
function logOut(){
    document.getElementById('hide_thong_ke').classList.add('hide_user');
    document.querySelector('.tab-item:first-child').click();
    cur_account='noAccount';
    render();
}
function logInUser(user){
    cur_account=user;
    render();
}
function logInAdmin(){
    cur_account='admin';
}
function show_thong_ke(){ 
    document.getElementById('hide_thong_ke').classList.toggle('hide_user');
}

//them
const body = document.querySelector("body"),
    modeToggle = body.querySelector(".mode-toggle");
sidebar = body.querySelector("sidebar");
sidebarToggle = body.querySelector(".sidebar-toggle");


let getStatus = localStorage.getItem("status");
if (getStatus && getStatus === "close") {
    sidebar.classList.toggle("close");
}

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if (sidebar.classList.contains("close")) {
        localStorage.setItem("status", "close");
    } else {
        localStorage.setItem("status", "open");
    }
})
