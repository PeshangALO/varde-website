document.addEventListener("DOMContentLoaded", function(){
fetch(`./json/employees.json`)
    .then(response => response.json())
    .then(data => {
    const employeeContainer = document.getElementById("team-members");
        data.forEach(employeeInfo => {
            const employeeWrapper = document.createElement("div");
            employeeWrapper.classList.add("employee-wrapper")

            const imgWrapper = document.createElement("div");
            imgWrapper.classList.add("employee-image-wrapper");

            const employeeImg = document.createElement("img");
            employeeImg.src = employeeInfo.image;
            employeeImg.alt = employeeInfo.title;
            employeeImg.loading = "lazy";
            employeeImg.classList.add("employee-img");

            const employeeDescription = document.createElement("div");
            employeeDescription.classList.add("employee-text");

            const employeeText = document.createElement("p");
            employeeText.textContent = employeeInfo.description;

            const employeePosition = document.createElement("h5");
            employeePosition.textContent = employeeInfo.position;
            

            const employeeName = document.createElement("h3");
            employeeName.textContent = employeeInfo.teamMember;       
        
            imgWrapper.appendChild(employeeImg);

            employeeWrapper.appendChild(imgWrapper);

            employeeDescription.appendChild(employeeName);
            employeeDescription.appendChild(employeePosition);
            employeeDescription.appendChild(employeeText);

            employeeWrapper.appendChild(employeeDescription);
        
            employeeContainer.appendChild(employeeWrapper);
        });
    }).catch(error => console.log("Error fetching employee data: ", error))
});


document.addEventListener("DOMContentLoaded", function(){
    fetch('./json/blogs.json')
        .then(response => response.json())
        .then(data => {

            data.sort((a, b) => new Date(b.date) - new Date(a.date));

            const firstBlogItem = data[0];
            
            const blogContainer = document.getElementById('latest-blog-wrapper');

            if(firstBlogItem){
                const blogItem = document.createElement('div');
                blogItem.classList.add('latest-blog-item');

                const blogImg = document.createElement('img');
                blogImg.src = firstBlogItem.image;
                blogImg.alt = "latest blog image";
                blogImg.classList.add('latest-blog-image');

                const blogText = document.createElement("div");
                blogText.classList.add("latest-blog-description");

                const blogTitle = document.createElement('h2');
                blogTitle.textContent = firstBlogItem.title;

                const blogDescription = document.createElement('p');
                blogDescription.textContent = firstBlogItem.description;
                blogDescription.classList.add('latest-blog-description');

                const blogDate = document.createElement('h6');
                blogDate.textContent = new Date(firstBlogItem.date).toLocaleDateString(
                    'en-US', {
                        year: "numeric", month: "long", day:"numeric"
                    });
                    blogDate.classList.add('latest-blog-date');
                                  
                    blogText.appendChild(blogTitle);
                    blogText.appendChild(blogDescription);
                    blogText.appendChild(blogDate);

                    blogItem.appendChild(blogImg);
                    blogItem.appendChild(blogText);

                    blogContainer.appendChild(blogItem);
            };
        });
});