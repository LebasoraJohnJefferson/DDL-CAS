function doGet(){
  const htmlServ = HtmlService.createTemplateFromFile("main").evaluate().addMetaTag("viewport","width=device-width, initial-scale=1.0");
  return htmlServ;
}