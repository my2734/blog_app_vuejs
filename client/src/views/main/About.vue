<template>
    <div class="col-md-9">
        <main>
            <div class="head ">
                <h1 class="page-title">About us</h1>
                <p class="subtitle">We are specialsts in web development. Creativity and fun are our ingredients for awesome work.</p>
            </div>
            <img class="main-image" src="https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" alt="two men in a coworking space">
            <div class="main-text">
                <h2 class="section-title">We're really great guys</h2>
                <p>Coding is a passion, and our team is the best you can get to thrive in your project. Our strengths are HTML, CSS & Javascript. If you want to learn more, please have a look at our Portfolio. </p>
                <p>We have learned everything from scratch and spend sleepless nights to learn all the fundamentals es well as the advanced stuff to create projects. We love to work in a co-working space and that´s why you will not find us a "normal" office.</p>
                <h2 class="section-title sub">We can do all sorts of great stuff </h2>
                <p>Honestly, we would like to support you with your project. We will get results together and at the end of the day, what else matters?</p>
                <p>So sure, maybe we're a bit different from what you'd expect, but if you want to get a professional Web presence we're the guy´s for you.</p>
            </div>
        </main>
   
    </div>
</template>

<script>
export default{
    name: 'AboutApp'
}

</script>

<style scoped>
* {box-sizing: border-box;}

body {
  margin: 0; 
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  background-color: black;
  color: #fff;
}

/*====== typography ======*/

h1 {
   font-weight: 700;
   color: #fff;
   font-size: 1.75rem;
}

h2 {
   font-weight: 700;
   color: #fff;
   font-size: 1.75rem;
}

.intro {
  font-size: 1.15rem;
  margin-bottom: 2.5em;
}

span {
   color: #fda039;
}

.black {
  font-weight: 700;
  color: #fff;
}

/*==== main-grid Layout ====*/

.main-grid {
    display: grid;
    grid-template-columns: minmax(1em, 1fr) minmax(0px, 500px) minmax(1em, 1fr);
    grid-column-gap: 2em;
}

/* ==== Layout ====*/

.header {
  background: #fff;
}

.header-content{
  display: flex;
  flex-direction: row;
  grid-column: 2 / -2;
}

.logo {
  background: #fda039;
  color: #fff;
  font-weight: 700;
  padding: 1em .5em;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.25rem;
}

.navigation {
  position: fixed;
  background: #fff;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 100%;
  transform: translateX(0);
  transition: transform 250ms;
}

.nav-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  font-size: 3rem;
}

.nav-link {
  text-decoration: none;
  color: #fda039;
}

.nav-link:hover,
.nav-link:focus,
.close-nav:hover,
.close-nav:focus,
.open-nav:hover,
.open-nav:focus {
  color: #fff;
  cursor: pointer;
}

.open-nav {
  border: 0;
  background: 0;
  color: #fff;
  padding: .5em;
  margin-left: auto;
  font-size: 1em;
}

.navigation-open {
  transform: translateX(-100%);
}

.close-nav {
    border: 0;
    background: 0;
    color: #fda039;
    font-weight: 700;
    font-size: 3rem;
    padding: .5em;
    position: absolute;
}

.current {
  border-bottom: 1px solid #fda039;
}

main {
  background-color: black;
  color: #fff;
  grid-column: 2 /-2;
}

  .head {
  grid-column: 2 / -2;
  text-align: center;
  margin-top: 3em;
  margin-bottom: 3em;
}

.page-title {
  color: #fff;
  font-size: 2.5rem;
  justify-self: center;
}

.main-image {
  grid-column: 2 / -2;
  object-fit: cover;
  max-width: 100%;
  display: block;
  box-shadow: 10px 10px 250px #fff;
}

.main-text {
  grid-column: 2 / -2;
  margin-top: 3em;
  margin-bottom: 3em;
}

.section-title::after {
  content: "";
  display: block;
  width: 100px;
  height: 3px;
  margin-top: 1em;
  background: #fda039;
  margin-left: auto;
  margin-right: auto;
}

.sub {
  margin-top: 3em;
}


.footer > * {
    grid-column: 2 / -2;
}

.footer {
   background: #ebebeb;  
   color: #fff;
}

.social {
  order: -1;
  font-size: 1.75rem;
  padding-top: 3em;
  padding-bottom: 2em;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.icon {
  color: #fff;
}
.icon:hover,
.icon:focus {
  cursor: mouse;
  color: #fda039;
}

.footer-text {
  display: flex;
  flex-direction: column;
}

.end {
  text-align: center;
  margin-bottom: 0;
}
.copyright {
  font-size: 1.1rem;
  padding-top: 1em;
  text-align: center;
  font-weight: 700;
}

.footer-text,
.copyright {
  opacity: .4;
  }
 

  @media (min-width: 600px) {
      .main-grid {
        grid-template-columns: minmax(1em, 1fr) repeat(3, minmax(20px, 320px)) minmax(1em, 1fr);
    }
    
    .open-nav,
    .close-nav {
      display: none;
    }
    
    .navigation {
      position: initial;
    }
    
    .nav-list {
      flex-direction: row;
      justify-content: flex-start;
    }
    
    .nav-link {
      margin-left: 1em;
      font-size: 1.7rem;
    }
    
    .logo {
      padding: .5em 1em;
      text-align: center;
    }
    
    .head {
      grid-column: 3 / -3;
    }
    
.page-title::after {
    content: '';
    display: block;
    width: 100%;
    height: 5px;
    background: #fda039;
    margin-right: auto;
    margin-left: auto;
    margin-top: 10px;
}
    
    .main-image {
      grid-column: 2;
      margin-top: 1.3em;
  
    }
    
    .main-text {
      grid-column: 3 / span 2;
      margin-top: 0;
    }
    
    .section-title::after {
  margin-left: 0;
}
    
    
    
    .footer {
      padding-top: 2em;
      padding-bottom: 2em;
    }
    
    .footer-text {
      grid-column: 2 / span 2;
    }
    
    .social {
      grid-column: span1;
    }
    
    .icon {
      margin: .5em;
    }
    
    .footer-text {
      width: 50vw;
      margin-left: 0;
      order: -1;
    }
    
    .end,
    .copyright {
      text-align: start;
    }
  }

@media(min-width: 700px) {
  .page-title::after {
    content: '';
    display: block;
    width: 160px;
    height: 5px;
    background: #fda039;
    margin-right: auto;
    margin-left: auto;
    margin-top: 10px;
}
}
</style>