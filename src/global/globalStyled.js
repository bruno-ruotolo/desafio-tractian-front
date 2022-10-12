import { createGlobalStyle } from "styled-components";

const GlobalStyled = createGlobalStyle`
//RESET STYLES
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

//DEFAULT STYLES
* {
  box-sizing: border-box;
}

body {
  font-family: 'Crete Round', serif;
	background-color: #224eb8
}


input {
  border: none;
}

button{
  border:none;
  background-color: none;
}

.create_button {
	display: flex;
	cursor: pointer;
	align-items: center;
	justify-content: center;
	border: none;
	margin-top: 100px;
	width: 280px;
	height: 70px;
	background-color: #224eb9;
	box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 4px;

	font-style: normal;
	font-weight: 400;
	font-size: 32px;
	line-height: 41px;
	text-align: justify;
	color: #ffffff;
}

.create_input {
	background-color: #d9d9d9;
	width: 500px;
	height: 55px;
	border-radius: 4px;
	padding-left: 20px;

	font-style: normal;
	font-weight: 400;
	font-size: 20px;
	line-height: 26px;
	text-align: justify;
	color: #00045c;
	margin-bottom: 20px;
}

.create_form {
	width: 100%;
	display: flex;
	margin-top: 50px;
	justify-content: center;
	flex-direction: column;
	align-items: center;
}

.create_wrapper {
	display: flex;
  position: relative;
  flex-direction: column;
  padding: 0px 100px;
  background-color: #224eb8;
  height: calc(100vh - 70px);
  top: 70px;
}

.create_container {
	position: relative;
  display: flex;
  flex-direction: column;
  top: 150px;
  background-color: #00045c;

  width: 100%;
  padding: 20px 40px;
  min-height: 600px;
}

.create_title_container {
	display: flex;
  margin-bottom: 80px;

  h2 {
    font-family: "Crete Round";
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 41px;
    text-align: justify;
    color: #ffffff;
  }

  .arrow_left_icon {
    color: #ffffff;
    font-size: 40px;
    margin-right: 30px;
  }
}
`;

export default GlobalStyled;
