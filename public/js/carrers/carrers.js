(function () {
    var user = JSON.parse(localStorage.actualUser);
    var ajaxHelper = new AjaxHelper();

    var templateCard = `<div class="carousel-item" data-career="#CareerId">

    <div class="d-flex justify-content-center">
      <div class="card card-cascade narrower">
        <div
          class="view view-cascade gradient-card-header blue-gradient narrower py-2 mx-4 mb-3 d-flex justify-content-between align-items-center">

          <div>
          </div>

          <a href="" class="white-text mx-3">Carrera: #CareerName</a><span data-percentile>#Percentile</span>

          <div>
          </div>

        </div>

        <div class="px-4">

          <div class="table-wrapper">
            <table class="table table-hover mb-0">
              <thead>
                <tr>
                  <th>
                    
                  </th>
                  <th class="th-lg">
                    <a>Cursos
                      <i class="fas fa-sort ml-1"></i>
                    </a>
                  </th>
                </tr>
              </thead>
              <tbody>
                #CoursesTemplate
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>

  </div>`;

    var courseTemplate = `<tr>
  <th scope="row">
    <input class="form-check-input" type="checkbox" data-course="#CourseId" id="#CourseCareerId">
    <label class="form-check-label" for="#CourseCareerId" class="label-table"></label>
  </th>
  <td>#CourseName</td>
</tr>`;

    var olTemplate = '<li data-target="#multi-item-example" data-slide-to="#Number"></li>';

    let getMyCareers = async () => {
        var htmlCareers = [];
        var pagination = "";
        var studentCareer = await ajaxHelper.getMethod("student_career/" + user.id);
        if (studentCareer) {
            var careers = studentCareer.careers;
            var ids = careers.map(x => x.id).join(",");
            for (let i = 0; i < careers.length; i++) {
                let htmlCareer = templateCard.replace("#Percentile", "0%")
                    .replace("#CareerId", careers[i].id)
                    .replace("#CareerName", `${careers[i].name} (${careers[i].id})`);
                htmlCareers.push(htmlCareer);
                pagination += olTemplate.replace("#Number", i);
            }
            var careerCourses = await ajaxHelper.getMethod("career_course/" + ids);
            if (careerCourses) {
                for (let i = 0; i < careerCourses.length; i++) {
                    let htmlCourse = "";
                    let courses = careerCourses[i].courses;
                    for (let j = 0; j < courses.length; j++) {
                        htmlCourse += courseTemplate.replace("#CourseCareerId", `${courses[j].id}|${careerCourses[i].career.id}`)
                            .replace("#CourseCareerId", `${courses[j].id}|${careerCourses[i].career.id}`)
                            .replace("#CourseId", courses[j].id)
                            .replace("#CourseName", courses[j].name);
                    }
                    htmlCareers[i] = htmlCareers[i].replace("#CoursesTemplate", htmlCourse);
                }
                var totalHTML = htmlCareers.join("");
                document.querySelector(".carousel-inner").innerHTML = totalHTML;
                document.querySelector(".carousel-indicators").innerHTML = pagination;
                document.querySelector("[data-slide-to='0']").classList.add("active");
                document.querySelector("[data-career]").classList.add("active");
                var spinner = document.querySelector("#spinner");
                spinner.remove();
                document.querySelector("#multi-item-example").style.display = "";
                $('.carousel').carousel({
                    wrap: false
                });
                getMyCompletedCarrers();
                document.querySelectorAll("input[type='checkbox']").forEach(x=>x.addEventListener("change",handlerOnChangeEventCheckBox));
            }
        }
    };

    let getMyCompletedCarrers = async () => {
        var studentCoursesCompleted = await ajaxHelper.getMethod("student_course/" + user.id);
        var coursesCompleted = studentCoursesCompleted.courses;
        coursesCompleted.forEach(course => {
            var elements = document.querySelectorAll("[data-course='" + course.id + "']");
            elements.forEach(x => x.checked = true);
        });
        updatePercentile();
    }

    let updatePercentile = () => {
        var cardsCareers = document.querySelectorAll("[data-career]");
        cardsCareers.forEach(element => {
            var totalCourses = element.querySelectorAll("input[type='checkbox']").length;
            var completedCourses = element.querySelectorAll("input[type='checkbox']:checked").length;
            var percentile = Math.floor(completedCourses / totalCourses * 100);
            element.querySelector("[data-percentile]").innerHTML = percentile + "%";
        })
    }

    let handlerOnChangeEventCheckBox = async function () {
        var element = this;
        var ids = element.id.split("|");
        var data = {
            studentId : user.id,
            courseId : ids[0]
        };
        if(element.checked){
            await ajaxHelper.postMethod("student_course", data);
        }
        else{
          await ajaxHelper.deleteMethod("student_course", data);
        }
        document.querySelectorAll("[data-course='" + data.courseId + "']").forEach(x => x.checked = element.checked);
        updatePercentile();
    }

    getMyCareers();
})();