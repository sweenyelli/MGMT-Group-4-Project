// Load default page
loadPage("dashboard")

/* ---------------------- PAGE LOADER ---------------------- */
function loadPage(page){
    let html=""

    /* DASHBOARD */
if(page==="dashboard"){
    html=`
    <h2>Dashboard</h2>
    <div class="grid">
        <div class="card">
            <h3>📚 Courses</h3>
            <p>${JSON.parse(localStorage.getItem("courses") || "[]").length} Active Courses</p>
        </div>
        <div class="card">
            <h3>📝 Assignments</h3>
            <div id="dashboardAssignments"></div>
        </div>
        <div class="card">
            <h3>📅 Schedule</h3>
            <p>3 Classes Today</p>
        </div>
        <div class="card">
            <h3>🔔 Notifications</h3>
            <p>Career Fair Sept 12</p>
        </div>
    </div>

    <h2>📅 Upcoming School Events</h2>
    <div id="eventList" class="grid"></div>
    `
    setTimeout(()=>{
        loadEvents()
        loadDashboardAssignments()
    },10)
}
    /* COURSES */
    if(page==="courses"){
        html=`
        <h2>My Courses</h2>
        <div>
            <input id="newCourseName" placeholder="New course name">
            <input id="newCourseProf" placeholder="Professor Name">
            <button onclick="addCourse()">Add Course</button>
        </div>
        <div id="courseList" class="grid" style="margin-top:20px;"></div>
        `
        setTimeout(loadCourses,10)
    }

    /* ASSIGNMENTS */
    if(page==="assignments"){
    html=`
    <h2>Assignments</h2>
    <div class="card">
        <h3>Add New Assignment</h3>
        <input id="assignmentTitle" placeholder="Assignment Title">
        <input id="assignmentCourse" placeholder="Course Name">
        <textarea id="assignmentDetail" placeholder="Details"></textarea>
        <input type="date" id="assignmentDue">
        <button onclick="addAssignment()">Add Assignment</button>
    </div>
    <div id="assignmentList" style="margin-top:20px;"></div>
    `
    setTimeout(loadAssignments,10)
}
    /* CALENDAR */
if(page==="calendar"){
    html=`
    <h2>Calendar</h2>

    <div class="card">
        <h3>Add Custom Event</h3>
        <input id="eventTitle" placeholder="Event Title">
        <input type="date" id="eventDate">
        <input type="time" id="eventTime">
        <textarea id="eventDesc" placeholder="Description"></textarea>
        <select id="eventType">
            <option value="class">Class 📚</option>
            <option value="assignment">Assignment 📝</option>
            <option value="group">Study Group 👥</option>
            <option value="other">Other 🔔</option>
        </select>
        <button onclick="addCalendarEvent()">Add Event</button>
    </div>

    <h3 style="margin-top:20px">All Events</h3>
    <div id="calendarList" class="grid"></div>
    `
    setTimeout(loadCalendarEvents,10)
}

    /* MESSAGES */
if(page==="messages"){
    html=`
    <h2>Messages</h2>
    
    <div class="card">
        <h3>Send a Message</h3>
        <input id="msgTo" placeholder="To (name)">
        <input id="msgSubject" placeholder="Subject">
        <textarea id="msgText" placeholder="Message"></textarea>
        <button onclick="sendMessage()">Send</button>
    </div>

    <h3 style="margin-top:20px">Inbox</h3>
    <div id="messageList" class="grid"></div>
    `
    setTimeout(loadMessages,10)
}
    /* STUDY GROUPS */
    if(page==="groups"){
        html=`
        <h2>Study Groups</h2>
        <div class="card">
            <h3>Create Study Group</h3>
            <input id="groupName" placeholder="Group Name">
            <input id="groupCourse" placeholder="Course / Subject">
            <input type="date" id="groupDate">
            <input type="time" id="groupTime">
            <input id="groupLocation" placeholder="Location (Library / Online)">
            <textarea id="groupDesc" placeholder="Description"></textarea>
            <button onclick="createGroup()">Create Group</button>
        </div>
        <br>
        <h3>Available Groups</h3>
        <div id="groupList" class="grid"></div>
        `
        setTimeout(loadGroups,10)
    }

    /* MARKETPLACE */
    if(page==="marketplace"){
        html=`
        <h2>Marketplace</h2>
        <div class="card">
            <h3>Sell an Item</h3>
            <input id="itemName" placeholder="Item name">
            <input id="itemPrice" placeholder="Price">
            <input id="sellerName" placeholder="Your name">
            <select id="itemCategory">
                <option>Books</option>
                <option>Electronics</option>
                <option>Notes</option>
                <option>Supplies</option>
                <option>Other</option>
            </select>
            <textarea id="itemDesc" placeholder="Description"></textarea>
            <input id="itemImage" placeholder="Image URL (optional)">
            <button onclick="addItem()">Post Item</button>
        </div>
        <br>
        <input id="searchBox" placeholder="Search items..." onkeyup="loadItems()">
        <div id="items" class="grid"></div>
        `
        setTimeout(loadItems,10)
    }

    /* PROFILE */
    if(page==="profile"){
        html=`
        <h2>Student Profile</h2>
        <div class="item">Name: Student</div>
        <div class="item">ID: 123456</div>
        <div class="item">Program: Computer Science</div>
        `
    }

    document.getElementById("content").innerHTML=html
}

/* ---------------------- DASHBOARD EVENTS ---------------------- */
function loadEvents(){
    let events = [
        {name:"Winter Open House", date:"Sat, Mar 7, 2026, 10:00 a.m. – 2:00 p.m.", location:"BVC South Campus", desc:"Campus tours, meet staff, explore programs!"},
        {name:"Wellness Wednesday", date:"Wed, Mar 11, 2026, 11:00 a.m. – 1:00 p.m.", location:"South Campus TransAlta Hall", desc:"Student activities & keychain making."},
        {name:"Free Tax Clinic", date:"Every Wed (Mar 4 – Apr 22), 12:30 p.m. – 3:30 p.m.", location:"SABVC Office", desc:"Get help with your taxes."},
        {name:"Puppy Room Event", date:"Thu, Apr 9, 2026, 12:00 p.m. – 1:00 p.m.", location:"BVC South Campus", desc:"Relax with puppies on campus!"}
    ]

    let html=""
    events.forEach(e=>{
        html+=`
        <div class="card">
            <h3>${e.name}</h3>
            <p><b>Date:</b> ${e.date}</p>
            <p><b>Location:</b> ${e.location}</p>
            <p>${e.desc}</p>
        </div>
        `
    })

    document.getElementById("eventList").innerHTML = html
}

/* ---------------------- COURSES WITH NOTES & PROFESSORS ---------------------- */
function addCourse(){
    let name = document.getElementById("newCourseName").value.trim()
    let prof = document.getElementById("newCourseProf").value.trim()
    if(!name) return alert("Enter a course name")
    if(!prof) return alert("Enter the professor's name")
    
    let courses = JSON.parse(localStorage.getItem("courses") || "[]")
    courses.push({name: name, professor: prof, notes: []})
    localStorage.setItem("courses", JSON.stringify(courses))
    
    document.getElementById("newCourseName").value = ""
    document.getElementById("newCourseProf").value = ""
    loadCourses()
}

function loadCourses(){
    let courses = JSON.parse(localStorage.getItem("courses") || "[]")
    let html=""
    courses.forEach((course,index)=>{
        let notesHtml=""
        course.notes.forEach((noteObj,i)=>{
            let color = noteObj.priority === "high" ? "#ff4d4d" :
                        noteObj.priority === "medium" ? "#ffcc00" : "#4caf50"
            notesHtml+=`<div class="item" style="background:${color};color:white;padding:8px;margin-bottom:5px;border-radius:5px;">
                        ${noteObj.text} 
                        <button class="delete" onclick="deleteNote(${index},${i})">Delete</button>
                        </div>`
        })
        html+=`
        <div class="card">
            <h3 contenteditable="true" onblur="editCourseName(${index}, this.innerText)">${course.name}</h3>
            <p>Professor: <span contenteditable="true" onblur="editCourseProf(${index}, this.innerText)">${course.professor}</span></p>

            <input id="noteInput${index}" placeholder="Add a note or reminder">
            <select id="notePriority${index}">
                <option value="low">Low 🟢</option>
                <option value="medium">Medium 🟡</option>
                <option value="high">High 🔴</option>
            </select>
            <button onclick="addNote(${index})">Add Note</button>

            <div style="margin-top:10px">${notesHtml}</div>
            <button class="delete" onclick="deleteCourse(${index})" style="margin-top:10px">Delete Course</button>
        </div>
        `
    })
    document.getElementById("courseList").innerHTML = html
}

function addNote(courseIndex){
    let input = document.getElementById(`noteInput${courseIndex}`)
    let prioritySelect = document.getElementById(`notePriority${courseIndex}`)
    let note = input.value.trim()
    let priority = prioritySelect.value
    if(!note) return
    let courses = JSON.parse(localStorage.getItem("courses") || "[]")
    courses[courseIndex].notes.push({text:note, priority:priority})
    localStorage.setItem("courses", JSON.stringify(courses))
    input.value=""
    loadCourses()
}

function deleteNote(courseIndex, noteIndex){
    let courses = JSON.parse(localStorage.getItem("courses") || "[]")
    courses[courseIndex].notes.splice(noteIndex,1)
    localStorage.setItem("courses", JSON.stringify(courses))
    loadCourses()
}

function editCourseName(index,newName){
    let courses = JSON.parse(localStorage.getItem("courses") || "[]")
    courses[index].name = newName.trim() || courses[index].name
    localStorage.setItem("courses", JSON.stringify(courses))
    loadCourses()
}

function editCourseProf(index,newProf){
    let courses = JSON.parse(localStorage.getItem("courses") || "[]")
    courses[index].professor = newProf.trim() || courses[index].professor
    localStorage.setItem("courses", JSON.stringify(courses))
    loadCourses()
}

function deleteCourse(index){
    let courses = JSON.parse(localStorage.getItem("courses") || "[]")
    courses.splice(index,1)
    localStorage.setItem("courses", JSON.stringify(courses))
    loadCourses()
}

/* ---------------------- STUDY GROUPS ---------------------- */
function createGroup(){
    let name=document.getElementById("groupName").value
    let course=document.getElementById("groupCourse").value
    let date=document.getElementById("groupDate").value
    let time=document.getElementById("groupTime").value
    let location=document.getElementById("groupLocation").value
    let desc=document.getElementById("groupDesc").value
    let groups=JSON.parse(localStorage.getItem("groups")||"[]")
    groups.push({name,course,date,time,location,desc})
    localStorage.setItem("groups",JSON.stringify(groups))
    loadGroups()
}

function loadGroups(){
    let groups=JSON.parse(localStorage.getItem("groups")||"[]")
    let html=""
    groups.forEach((g,index)=>{
        html+=`
        <div class="card">
            <h3>${g.name}</h3>
            <p><b>Course:</b> ${g.course}</p>
            <p><b>Date:</b> ${g.date}</p>
            <p><b>Time:</b> ${g.time}</p>
            <p><b>Location:</b> ${g.location}</p>
            <p>${g.desc}</p>
            <button onclick="joinGroup('${g.name}')">Join</button>
            <button class="delete" onclick="deleteGroup(${index})">Delete</button>
        </div>
        `
    })
    document.getElementById("groupList").innerHTML = html
}

function joinGroup(name){
    alert("You joined the study group: "+name)
}

function deleteGroup(index){
    let groups=JSON.parse(localStorage.getItem("groups")||"[]")
    groups.splice(index,1)
    localStorage.setItem("groups",JSON.stringify(groups))
    loadGroups()
}

/* ---------------------- MARKETPLACE ---------------------- */
function addItem(){
    let name=document.getElementById("itemName").value
    let price=document.getElementById("itemPrice").value
    let seller=document.getElementById("sellerName").value
    let category=document.getElementById("itemCategory").value
    let desc=document.getElementById("itemDesc").value
    let image=document.getElementById("itemImage").value
    let items=JSON.parse(localStorage.getItem("items")||"[]")
    items.push({name,price,seller,category,desc,image})
    localStorage.setItem("items",JSON.stringify(items))
    loadItems()
}

function loadItems(){
    let items=JSON.parse(localStorage.getItem("items")||"[]")
    let search=document.getElementById("searchBox")?.value.toLowerCase() || ""
    let html=""
    items.forEach((i,index)=>{
        if(i.name.toLowerCase().includes(search) || i.category.toLowerCase().includes(search)){
            html+=`
            <div class="card">
                ${i.image? `<img src="${i.image}">` : ""}
                <h3>${i.name}</h3>
                <p><b>Category:</b> ${i.category}</p>
                <p>${i.desc}</p>
                <p><b>Price:</b> $${i.price}</p>
                <p><b>Seller:</b> ${i.seller}</p>
                <button onclick="contactSeller('${i.seller}')">Contact</button>
                <button class="delete" onclick="deleteItem(${index})">Delete</button>
            </div>
            `
        }
    })
    document.getElementById("items").innerHTML = html
}

function deleteItem(index){
    let items=JSON.parse(localStorage.getItem("items")||"[]")
    items.splice(index,1)
    localStorage.setItem("items",JSON.stringify(items))
    loadItems()
}

function contactSeller(name){
    alert("Contact "+name+" through BVC messages!")
}

//function assignment

/* ---------------------- ASSIGNMENTS ---------------------- */
function addAssignment(){
    let title = document.getElementById("assignmentTitle").value.trim()
    let course = document.getElementById("assignmentCourse").value.trim()
    let detail = document.getElementById("assignmentDetail").value.trim()
    let due = document.getElementById("assignmentDue").value

    if(!title || !course || !due) return alert("Please fill all fields")

    let assignments = JSON.parse(localStorage.getItem("assignments") || "[]")
    assignments.push({title, course, detail, due, completed:false})
    localStorage.setItem("assignments", JSON.stringify(assignments))

    document.getElementById("assignmentTitle").value=""
    document.getElementById("assignmentCourse").value=""
    document.getElementById("assignmentDetail").value=""
    document.getElementById("assignmentDue").value=""

    loadAssignments()
}

function loadAssignments(){
    let assignments = JSON.parse(localStorage.getItem("assignments") || "[]")
    let html=""

    let today = new Date()
    
    assignments.forEach((a,index)=>{
        // Alert 1 day before due
        let dueDate = new Date(a.due)
        let diffTime = dueDate - today
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        if(diffDays === 1 && !a.completed){
            alert(`Reminder: "${a.title}" for ${a.course} is due tomorrow!`)
        }

        let bg = a.completed ? "#d4edda" : "#fff"  // green for completed
        let textDeco = a.completed ? "line-through" : "none"

        html+=`
        <div class="item" style="background:${bg}; text-decoration:${textDeco};">
            <h3>${a.title}</h3>
            <p><b>Course:</b> ${a.course}</p>
            <p>${a.detail}</p>
            <p><b>Due:</b> ${a.due}</p>
            <button onclick="completeAssignment(${index})">${a.completed ? "Completed" : "Mark as Completed"}</button>
            <button class="delete" onclick="deleteAssignment(${index})">Delete</button>
        </div>
        `
    })

    document.getElementById("assignmentList").innerHTML = html
}

function completeAssignment(index){
    let assignments = JSON.parse(localStorage.getItem("assignments") || "[]")
    assignments[index].completed = true
    localStorage.setItem("assignments", JSON.stringify(assignments))
    loadAssignments()
}

function deleteAssignment(index){
    let assignments = JSON.parse(localStorage.getItem("assignments") || "[]")
    assignments.splice(index,1)
    localStorage.setItem("assignments", JSON.stringify(assignments))
    loadAssignments()
}

//dashboard function

function loadDashboardAssignments(){
    let assignments = JSON.parse(localStorage.getItem("assignments") || "[]")
    if(assignments.length === 0){
        document.getElementById("dashboardAssignments").innerHTML = "<p>No upcoming assignments</p>"
        return
    }

    // Sort by nearest due date
    assignments.sort((a,b)=>new Date(a.due) - new Date(b.due))

    let html = "<ul>"
    let today = new Date()
    assignments.forEach(a=>{
        let dueDate = new Date(a.due)
        let diffTime = dueDate - today
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        if(!a.completed){
            let color = diffDays <= 1 ? "#ff4d4d" : diffDays <= 3 ? "#ffcc00" : "#4caf50"
            html+=`<li style="color:${color}">${a.title} (${a.course}) - Due: ${a.due}</li>`
        }
    })
    html += "</ul>"
    document.getElementById("dashboardAssignments").innerHTML = html
}

//add calendar events

function addCalendarEvent(){
    let title = document.getElementById("eventTitle").value.trim()
    let date = document.getElementById("eventDate").value
    let time = document.getElementById("eventTime").value
    let desc = document.getElementById("eventDesc").value.trim()
    let type = document.getElementById("eventType").value

    if(!title || !date) return alert("Please enter title and date")

    let events = JSON.parse(localStorage.getItem("calendar")||"[]")
    events.push({title,date,time,desc,type})
    localStorage.setItem("calendar",JSON.stringify(events))

    document.getElementById("eventTitle").value=""
    document.getElementById("eventDate").value=""
    document.getElementById("eventTime").value=""
    document.getElementById("eventDesc").value=""
    document.getElementById("eventType").value="class"

    loadCalendarEvents()
}

function loadCalendarEvents(){
    let events = JSON.parse(localStorage.getItem("calendar")||"[]")
    let assignments = JSON.parse(localStorage.getItem("assignments")||"[]")
    let groups = JSON.parse(localStorage.getItem("groups")||"[]")
    let html=""

    // Include assignments as calendar events
    assignments.forEach(a=>{
        if(!a.completed) events.push({title:a.title,date:a.due,time:"",desc:`Course: ${a.course}`,type:"assignment"})
    })

    // Include study groups
    groups.forEach(g=>{
        events.push({title:g.name,date:g.date,time:g.time,desc:`Course: ${g.course}, Location: ${g.location}`,type:"group"})
    })

    // Sort by date and time
    events.sort((a,b)=>{
        let dateA = new Date(a.date+" "+(a.time||"00:00"))
        let dateB = new Date(b.date+" "+(b.time||"00:00"))
        return dateA - dateB
    })

    events.forEach(e=>{
        let color = e.type==="class"?"#4a6cf7":
                    e.type==="assignment"?"#ffcc00":
                    e.type==="group"?"#4caf50":"#aaa"
        html+=`
        <div class="item" style="border-left:5px solid ${color}">
            <h4>${e.title}</h4>
            <p><b>Date:</b> ${e.date} ${e.time}</p>
            <p>${e.desc}</p>
            <p><b>Type:</b> ${e.type}</p>
        </div>
        `
    })

    document.getElementById("calendarList").innerHTML=html
}


//messages

/* ---------------------- MESSAGES ---------------------- */
function sendMessage(){
    let to = document.getElementById("msgTo").value.trim()
    let subject = document.getElementById("msgSubject").value.trim()
    let text = document.getElementById("msgText").value.trim()
    if(!to || !text) return alert("Please enter recipient and message")

    let messages = JSON.parse(localStorage.getItem("messages")||"[]")
    messages.push({
        to,
        subject,
        text,
        date: new Date().toLocaleString(),
        read: false
    })
    localStorage.setItem("messages", JSON.stringify(messages))

    document.getElementById("msgTo").value=""
    document.getElementById("msgSubject").value=""
    document.getElementById("msgText").value=""
    loadMessages()
}

function loadMessages(){
    let messages = JSON.parse(localStorage.getItem("messages")||"[]")
    let html=""
    messages.slice().reverse().forEach((m,index)=>{
        let bg = m.read ? "#f5f5f5" : "#e1f0ff"
        html+=`
        <div class="item" style="background:${bg}">
            <p><b>To:</b> ${m.to} | <b>Subject:</b> ${m.subject || "(No subject)"} | <i>${m.date}</i></p>
            <p>${m.text}</p>
            <button onclick="markRead(${messages.length-1 - index})">${m.read ? "Mark Unread" : "Mark Read"}</button>
            <button class="delete" onclick="deleteMessage(${messages.length-1 - index})">Delete</button>
        </div>
        `
    })
    document.getElementById("messageList").innerHTML = html
}

function markRead(index){
    let messages = JSON.parse(localStorage.getItem("messages")||"[]")
    messages[index].read = !messages[index].read
    localStorage.setItem("messages", JSON.stringify(messages))
    loadMessages()
}

function deleteMessage(index){
    let messages = JSON.parse(localStorage.getItem("messages")||"[]")
    messages.splice(index,1)
    localStorage.setItem("messages", JSON.stringify(messages))
    loadMessages()
}
