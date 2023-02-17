<template>
    <div class="col-md-3">
        <div class="side-bar">
          <div class="search">
            <fieldset>
              <input
                name="search"
                type="text"
                class="form-control"
                id="search"
                placeholder="Search..."
                required=""
              />
            </fieldset>
          </div>
          <div class="archives">
            <div class="sidebar-heding">
              <h2>Archives</h2>
            </div>
            <ul>
              <li><a href="#">> 2018 September (4)</a></li>
              <li><a href="#">> 2018 August (16)</a></li>
              <li><a href="#">> 2018 July (5)</a></li>
              <li><a href="#">> 2018 May (3)</a></li>
              <li><a href="#">> 2018 February (27)</a></li>
              <li><a href="#">> 2017 December (18)</a></li>
              <li><a href="#">> 2017 November (12)</a></li>
            </ul>
          </div>
          <div class="recent-posts">
            <div class="sidebar-heding">
              <h2>Recent Posts</h2>
            </div>
            <ul>
              <li>
                <a href="single-post.html">
                  <img src="img/recent_post_1.png" alt="Recent Post 1" />
                  <div class="text">
                    <h6>Duis mollis orci</h6>
                    <span>15 September 2018</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="single-post.html">
                  <img src="img/recent_post_2.png" alt="Recent Post 2" />
                  <div class="text">
                    <h6>Etiam quis tem</h6>
                    <span>10 August 2018</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="single-post.html">
                  <img src="img/recent_post_3.png" alt="Recent Post 3" />
                  <div class="text">
                    <h6>Proin at augue</h6>
                    <span>16 July 2018</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div class="categories">
            <div class="sidebar-heding">
              <h2>Categories</h2>
            </div>
            <ul>
              <li><a href="#">> Lifestyle (7)</a></li>
              <li><a href="#">> Branding (9)</a></li>
              <li><a href="#">> Nature (14)</a></li>
              <li><a href="#">> Work Stuff (6)</a></li>
              <li><a href="#">> Science (5)</a></li>
            </ul>
          </div>
          <div class="latest-gallery">
            <div class="sidebar-heding">
              <h2>Latest Gallery</h2>
            </div>
            <ul>
              <li>
                <a href="#">
                  <img src="img/latest_gallery_1.png" alt="" />
                </a>
              </li>
              <li>
                <a href="#"><img src="img/latest_gallery_2.png" alt="" /></a>
              </li>
              <li>
                <a href="#"><img src="img/latest_gallery_3.png" alt="" /></a>
              </li>
              <li>
                <a href="#"><img src="img/latest_gallery_4.png" alt="" /></a>
              </li>
              <li>
                <a href="#"><img src="img/latest_gallery_5.png" alt="" /></a>
              </li>
              <li>
                <a href="#"><img src="img/latest_gallery_6.png" alt="" /></a>
              </li>
              <li>
                <a href="#"><img src="img/latest_gallery_7.png" alt="" /></a>
              </li>
              <li>
                <a href="#"><img src="img/latest_gallery_8.png" alt="" /></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
</template>


<script>
export default{
    name: 'SideBarApp'
}
</script>

<style>

</style>