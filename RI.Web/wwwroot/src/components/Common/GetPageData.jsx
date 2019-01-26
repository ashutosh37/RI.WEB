//Author : Ashutosh Nigam
//Date : 06/04/2018
import {Constants} from './Constants';
import _ from 'lodash';

export const GetProjectData = (callback) => {
    var spRequest = new XMLHttpRequest();
    spRequest.open('GET' , _spPageContextInfo.siteAbsoluteUrl + "/schools/_api/web/lists/getbytitle('Pages')/items?$filter=ID eq " + _spPageContextInfo.pageItemId , true)
    spRequest.setRequestHeader("Accept","application/json ; odata=verbose");
                    
    spRequest.onreadystatechange = () => { 
        
        if (spRequest.readyState === 4 && spRequest.status === 200){ 
            var result = JSON.parse(spRequest.responseText); 
            callback(result.d.results[0]) ; 
        } 
        else if (spRequest.readyState === 4 && spRequest.status !== 200){ 
            console.log('Error Occurred !'); 
        } 
    }; 
    spRequest.send();
}

export const GetMilestoneData = (projectcode , callback) =>{
    var spRequest = new XMLHttpRequest();
    spRequest.open('GET' , _spPageContextInfo.siteAbsoluteUrl + "/schools/_api/web/lists/getbytitle('Milestones')/items?$filter=Title eq '" + projectcode + "'&$orderby=Order0" , true)
    spRequest.setRequestHeader("Accept","application/json ; odata=verbose");
                    
    spRequest.onreadystatechange = () => { 
        
        if (spRequest.readyState === 4 && spRequest.status === 200){ 
            var result = JSON.parse(spRequest.responseText); 
            callback(result.d.results) ; 
        } 
        else if (spRequest.readyState === 4 && spRequest.status !== 200){ 
            console.log('Error Occurred !'); 
        } 
    }; 
    spRequest.send();
}
export const GetHomePageConfig =(callback) => {
    var spRequest = new XMLHttpRequest();
    spRequest.open('GET' , _spPageContextInfo.siteAbsoluteUrl + "/schools/_api/web/lists/getbytitle('HomePageConfig')/items" , true)
    spRequest.setRequestHeader("Accept","application/json ; odata=verbose");
                    
    spRequest.onreadystatechange = () => { 
        
        if (spRequest.readyState === 4 && spRequest.status === 200){ 
            var result = JSON.parse(spRequest.responseText); 
            callback(result.d.results[0]);

        } 
        else if (spRequest.readyState === 4 && spRequest.status !== 200){ 
            console.log('Error Occurred !'); 
        } 
    }; 
    spRequest.send(); 
}


export const GetAllProjectDataOld = (callback) => {
    if(sessionStorage.getItem('allprojects') !== null){
        callback(JSON.parse(sessionStorage.getItem('allprojects')));
    }
   else{
    var spRequest = new XMLHttpRequest();
    spRequest.open('GET' , _spPageContextInfo.siteAbsoluteUrl + "/schools/_api/web/lists/getbytitle('Pages')/items?$select=Title,FileRef,Latitude,Longitude,School_x0020_Funding,MapPinType,Funding_x0020_Type,Street,Suburb,Postcode,Parent&$expand=ContentType&$filter=ContentType eq 'VSBAProject'&$top=6000" , true)
    spRequest.setRequestHeader("Accept","application/json ; odata=verbose");
                    
    spRequest.onreadystatechange = () => { 
        
        if (spRequest.readyState === 4 && spRequest.status === 200){ 
            
            var result = JSON.parse(spRequest.responseText); 
            sessionStorage.setItem("allprojects" , JSON.stringify(result.d.results));
            callback(result.d.results) ; 
        } 
        else if (spRequest.readyState === 4 && spRequest.status !== 200){ 
            console.log('Error Occurred !'); 
        } 
    }; 
    spRequest.send();
 }
}

export const GetAllProjectData = (callback) => {
 

    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function(){
        if(sessionStorage.getItem('allprojects') !== null){
            callback(JSON.parse(sessionStorage.getItem('allprojects')));
        }
       else{
        var ctx = new SP.ClientContext("/schools");
        var pagesLibrary = ctx.get_web().get_lists().getByTitle('Pages');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml("<View><ViewFields> \
        <FieldRef Name='Title'></FieldRef> \
        <FieldRef Name='FileRef'></FieldRef> \
        <FieldRef Name='Latitude'></FieldRef> \
        <FieldRef Name='Longitude'></FieldRef> \
        <FieldRef Name='School_x0020_Funding'></FieldRef> \
        <FieldRef Name='MapPinType'></FieldRef> \
        <FieldRef Name='Funding_x0020_Type'></FieldRef> \
        <FieldRef Name='Street'></FieldRef> \
        <FieldRef Name='Suburb'></FieldRef> \
        <FieldRef Name='Postcode'></FieldRef> \
        <FieldRef Name='Parent'></FieldRef> \
    </ViewFields><OrderBy><FieldRef Name='Title' Ascending='True'/></OrderBy><Where><Eq><FieldRef Name='ContentType' /><Value Type='Computed'>VSBAProject</Value></Eq></Where></View>");
        var featuredPages = pagesLibrary.getItems(camlQuery);
        ctx.load(featuredPages);
        ctx.executeQueryAsync(() => {
          // Get the first items rollup image, just as an example
          var listItemEnumerator = featuredPages.getEnumerator(); //getItemAtIndex(0).get_item('PublishingRollupImage');
          var listitems = [];
          //Latitude,Longitude,School_x0020_Funding,MapPinType,Funding_x0020_Type,Street,Suburb,Postcode,Parent
          while (listItemEnumerator.moveNext()) {
            var current = listItemEnumerator.get_current();
            var listitem = {};
            listitem.Title = current.get_item("Title");
            listitem.FileRef = current.get_item("FileRef");
            listitem.Latitude = current.get_item("Latitude");
            listitem.Longitude = current.get_item("Longitude");
            listitem.School_x0020_Funding = current.get_item("School_x0020_Funding");
            listitem.MapPinType = current.get_item("MapPinType");
            listitem.Funding_x0020_Type = current.get_item("Funding_x0020_Type");
            listitem.Street = current.get_item("Street");
            listitem.Suburb = current.get_item("Suburb");
            listitem.Postcode = current.get_item("Postcode");
            listitem.Parent = current.get_item("Parent");
            listitems.push(listitem);
            
            //$(".FeaturedArticles>ul").append(<li><a href ={listitem.Url}><img src={listitem.ImageUrl } alt={listitem.Title}/><span>{listitem.Title}</span><p>{listitem.Description}</p></a></li>);
            //listitem.RollupImage = current[""]
    
    
          }
    
          var sortedlist =  _.orderBy(listitems , ['Title'])
          sessionStorage.setItem('allprojects', JSON.stringify(sortedlist));
          callback(sortedlist) ;
          
            });
        }

  });
}

export const GetMultiProjectData = (parentCode , callback) => {
    var spRequest = new XMLHttpRequest();
    spRequest.open('GET' ,  _spPageContextInfo.siteAbsoluteUrl + "/schools/_api/web/lists/getbytitle('Pages')/items?$filter=Parent eq '" + parentCode + "'" , true)
    spRequest.setRequestHeader("Accept","application/json ; odata=verbose");
                    
    spRequest.onreadystatechange = () => { 
        
        if (spRequest.readyState === 4 && spRequest.status === 200){ 
            var result = JSON.parse(spRequest.responseText); 
            callback(result.d.results) ; 
        } 
        else if (spRequest.readyState === 4 && spRequest.status !== 200){ 
            console.log('Error Occurred !'); 
        } 
    }; 
    spRequest.send();
}

export const GetVideoData = (projectcode,callback) => {
    var spRequest = new XMLHttpRequest();
    spRequest.open('GET' , _spPageContextInfo.siteAbsoluteUrl + "/schools/_api/web/lists/getByTitle('Project%20Videos')/items?$filter=ProjectCode eq '" + projectcode + "'&$select=Title" , true);
    spRequest.setRequestHeader("Accept","application/json ; odata=verbose");
                    
    spRequest.onreadystatechange = () => { 
        
        if (spRequest.readyState === 4 && spRequest.status === 200){ 
            var result = JSON.parse(spRequest.responseText); 
            callback(result.d.results) ; 
        } 
        else if (spRequest.readyState === 4 && spRequest.status !== 200){ 
            console.log('Error Occurred !'); 
        } 
    }; 
    spRequest.send();
}

export const GetImageData = (projectcode,callback) => {
    var spRequest = new XMLHttpRequest();
    spRequest.open('GET' , _spPageContextInfo.siteAbsoluteUrl + "/schools/_api/web/GetFolderByServerRelativeUrl('/schools/PublishingImages/"+projectcode+"')?$expand=Files" , true)

    spRequest.setRequestHeader("Accept","application/json ; odata=verbose");
                    
    spRequest.onreadystatechange = () => { 
        
        if (spRequest.readyState === 4 && spRequest.status === 200){ 
            var result = JSON.parse(spRequest.responseText); 
            callback(result.d.Files.results) ; 
        } 
        else if (spRequest.readyState === 4 && spRequest.status !== 200){ 
            console.log('Error Occurred !'); 
        } 
    }; 
    spRequest.send();
}

export const GetFeaturedArticlesData = (callback) =>{
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function(){
        var ctx = new SP.ClientContext("/blog");
        var pagesLibrary = ctx.get_web().get_lists().getByTitle('Pages');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'Featured\'/>' +
          '<Value Type=\'Boolean\'>1</Value></Eq></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\'/></OrderBy></Query><RowLimit>3</RowLimit></View>');
        var featuredPages = pagesLibrary.getItems(camlQuery);
        ctx.load(featuredPages);
        ctx.executeQueryAsync(() => {
          // Get the first items rollup image, just as an example
          var listItemEnumerator = featuredPages.getEnumerator(); //getItemAtIndex(0).get_item('PublishingRollupImage');
          var listitems = [];
          while (listItemEnumerator.moveNext()) {
            var current = listItemEnumerator.get_current();
            var listitem = {};
            listitem.Title = current.get_item("Title");
            var regex = /<img.+?src=[\"'](.+?)[\"'].*?>/;
            var imageurl = current.get_item("PublishingRollupImage") !== ''  && regex.exec(current.get_item("PublishingRollupImage")) !== null ? regex.exec(current.get_item("PublishingRollupImage"))[1] : '';
            listitem.ImageUrl = imageurl;
    
            listitem.Description = current.get_item("DEECD_Description");
            listitem.Url = current.get_item("FileRef");
            listitems.push(listitem);
    
            //$(".FeaturedArticles>ul").append(<li><a href ={listitem.Url}><img src={listitem.ImageUrl } alt={listitem.Title}/><span>{listitem.Title}</span><p>{listitem.Description}</p></a></li>);
            //listitem.RollupImage = current[""]
    
    
          }
    
          callback(listitems) ;
    });

  });
}

export const GetArticlesData = (rowlimit , callback) =>{
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function(){
        var ctx = new SP.ClientContext("/blog");
        var pagesLibrary = ctx.get_web().get_lists().getByTitle('Pages');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'Featured\'/>' +
          '<Value Type=\'Boolean\'>0</Value></Eq></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\'/></OrderBy></Query><RowLimit>'+rowlimit+'</RowLimit></View>');
        var featuredPages = pagesLibrary.getItems(camlQuery);
        ctx.load(featuredPages);
        ctx.executeQueryAsync(() => {
          // Get the first items rollup image, just as an example
          var listItemEnumerator = featuredPages.getEnumerator(); //getItemAtIndex(0).get_item('PublishingRollupImage');
          var listitems = [];
          while (listItemEnumerator.moveNext()) {
            var current = listItemEnumerator.get_current();
            var listitem = {};
            listitem.Title = current.get_item("Title");
            var regex = /<img.+?src=[\"'](.+?)[\"'].*?>/;
            var imageurl = current.get_item("PublishingRollupImage") !== null && regex.exec(current.get_item("PublishingRollupImage")) !== null ? regex.exec(current.get_item("PublishingRollupImage"))[1] : '';
            listitem.ImageUrl = imageurl;
    
            listitem.Description = current.get_item("DEECD_Description");
            listitem.Url = current.get_item("FileRef");
            if(listitem.Title !== "Home")
                listitems.push(listitem);
    
    
          }
    
          callback(listitems) ;
    });

  });
}

export const GetPostCode = (text , callback) =>{
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function(){
        var ctx = new SP.ClientContext("/schools");
        var pagesLibrary = ctx.get_web().get_lists().getByTitle('PostCodes');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml("<View><Query><Where><Or><BeginsWith><FieldRef Name='Title' /><Value Type='Text'>"+text+"</Value></BeginsWith><BeginsWith><FieldRef Name='Suburb' /><Value Type='Text'>"+text+"</Value></BeginsWith></Or></Where><OrderBy><FieldRef Name='Title' Ascending='True' /></OrderBy></Query><RowLimit>10</RowLimit></View>");
        var featuredPages = pagesLibrary.getItems(camlQuery);
        ctx.load(featuredPages);
        ctx.executeQueryAsync(() => {
          // Get the first items rollup image, just as an example
          var listItemEnumerator = featuredPages.getEnumerator(); //getItemAtIndex(0).get_item('PublishingRollupImage');
          var listitems = [];
          while (listItemEnumerator.moveNext()) {
            var current = listItemEnumerator.get_current();
            var listitem = {};
            listitem.Title = current.get_item("Title");
            listitem.Suburb = current.get_item("Suburb")
            listitems.push(listitem);
    
          }
    
          callback(listitems) ;
    });

  });
}
export const GetPinColor = (mappintype) => {
    var color = "";
    switch(mappintype){
        case Constants.mappintype.New : color = Constants.pincolors.red; break ; 
        case Constants.mappintype.Upgrade : color = Constants.pincolors.grey; break ; 
        case Constants.mappintype.EarlyChildHood : color = Constants.pincolors.blue; break ; 
        case Constants.mappintype.Future : color = Constants.pincolors.yellow; break ; 
        case Constants.mappintype.Tech : color = Constants.pincolors.lightgrey; break ; 
    }

    return color;
}

export const GetPinIcon= (mappintype) => {
    var color = "";
    switch(mappintype){
        case Constants.mappintype.New : color = Constants.PushPinIconNewSchools; break ; 
        case Constants.mappintype.Upgrade : color = Constants.PushPinIconUpgrade; break ; 
        case Constants.mappintype.EarlyChildHood : color = Constants.PushPinIconEarlyLearning; break ; 
        case Constants.mappintype.Future : color = Constants.PushPinIconPlanning; break ; 
        case Constants.mappintype.Tech : color = Constants.PushPinIconTechSchools; break ; 
    }

    return color;
}
export const GetPinIconLrg= (mappintype) => {
    var color = "";
    switch(mappintype){
        case Constants.mappintype.New : color = Constants.PushPinIconNewSchoolsLg; break ; 
        case Constants.mappintype.Upgrade : color = Constants.PushPinIconUpgradeLg; break ; 
        case Constants.mappintype.EarlyChildHood : color = Constants.PushPinIconEarlyLearningLg; break ; 
        case Constants.mappintype.Future : color = Constants.PushPinIconPlanningLg; break ; 
        case Constants.mappintype.Tech : color = Constants.PushPinIconTechSchoolsLg; break ; 
    }

    return color;
}
export const GetDummyData = (callback) => {

   var page  = {};
   page.Title = "Hello Page";
   page.Street = "8 Beaurepaire Drive";
   page.Suburb = "Point Cook" ; 
   page.PostCode = "3030" ; 
   page.Phone = "03 456789876";
   page.Email = "abcgdtyrd@gmail.com";
   page.School_x0020_Funding = "In the 2016-2017 State Busget, $1.8 million has been allocated to the plan";
   page.Funding_x0020_Type = "Planning";
   page.ProjectStart = "Q4, 2017" ; 
   page.ProjectEnd = "Q2, 2019" ; 
   page.Project_x0020_Status = "Construction" ; 
   callback(page);

} 