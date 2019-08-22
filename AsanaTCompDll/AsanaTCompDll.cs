using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI;

namespace AsanaTCompDll
{
    public class AsanaTCompDll
    {
        //Tek Js Doasyası Tek Class Altında Dll yapılıyor 
        public AsanaTCompDll(Page pgg)
        {
            //IncludeJsFilee(pgg);
        }
        public void IncludeJsFilee(Page pgg)
        {
            pgg.ClientScript.RegisterClientScriptInclude(this.GetType(), "Test", pgg.ClientScript.GetWebResourceUrl(this.GetType(), "asanaDll.AsanaTaskJs.js"));
            string csslink = "<script type='text/javascript' language='javascript' src='" + pgg.ClientScript.GetWebResourceUrl(this.GetType(), "asanaDll.AsanaTaskJs.js") + "' />";
            LiteralControl include = new LiteralControl(csslink);
            pgg.Header.Controls.Add(include);
        }

        public string MissionCompleted(Page page, string user_id, string task_id)
        {
            string retval = "başarılı";
            string script = "var settings_finished = {\"url\": \"https://app.asana.com/api/1.0/tasks/" + task_id + "/?opt_pretty\",\"method\": \"PUT\",\"timeout\": 0,\"headers\": { \"Authorization\": \"Bearer " + user_id + "\"},\"data\": { \"completed\": \"true\" } };";
            script += " $.ajax(settings_finished).done(function (response) { console.log(response); swal({ title: \"Tebrikler\", text: \"Görev Tamamlandı2 !\", type:\"success\" }).then(function() { location.reload();} );});";
            ScriptManager.RegisterClientScriptBlock(page, typeof(Page), "", script, true);
            return script;
        }
    }
}
