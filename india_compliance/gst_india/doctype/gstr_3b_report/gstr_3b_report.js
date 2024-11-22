// Copyright (c) 2019, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.ui.form.on('GSTR 3B Report', {
	refresh : function(frm) {
		frm.doc.__unsaved = 1;
		if(!frm.is_new()) {
			frm.set_intro(__("Please save the report again to rebuild or update"));
			frm.add_custom_button(__('Download JSON'), function() {
				var w = window.open(
					frappe.urllib.get_full_url(
						"/api/method/india_compliance.gst_india.doctype.gstr_3b_report.gstr_3b_report.make_json?"
						+"name="+encodeURIComponent(frm.doc.name)));

				if(!w) {
					frappe.msgprint(__("Please enable pop-ups")); return;
				}
			});
			frm.add_custom_button(__('View Form'), function() {
				frappe.call({
					"method" : "india_compliance.gst_india.doctype.gstr_3b_report.gstr_3b_report.view_report",
					"args" : {
						name : frm.doc.name,
					},
					"callback" : function(r){

						let data = r.message;

<<<<<<< HEAD
						frappe.ui.get_print_settings(false, print_settings => {
=======
        let current_year = new Date().getFullYear();
        let options = [current_year, current_year - 1, current_year - 2];
        frm.set_df_property("year", "options", options);
        frm.set_value("year", options[0]);
>>>>>>> 1abb2db5 (fix: update naming rule and set field's value properly)

							frappe.render_grid({
								template: 'gstr_3b_report',
								title: __(this.doctype),
								print_settings: print_settings,
								data: data,
								columns:[]
							});
						});
					}
				});
			});
		}

		let current_year = new Date().getFullYear();
		let options = [current_year, current_year-1, current_year-2];
		frm.set_df_property('year', 'options', options);

		frappe.realtime.on("gstr3b_report_generation", function(){
			frm.reload_doc();
		});
	},

<<<<<<< HEAD
	setup: function(frm) {
		frm.set_query('company_address', function(doc) {
			if(!doc.company) {
				frappe.throw(__('Please set Company'));
			}
=======
        if (!frm.doc.company) return;
        const options = await india_compliance.set_gstin_options(frm);
        frm.set_value("company_gstin", options[0]);
    },
>>>>>>> 1abb2db5 (fix: update naming rule and set field's value properly)

			return {
				query: 'frappe.contacts.doctype.address.address.address_query',
				filters: {
					link_doctype: 'Company',
					link_name: doc.company
				}
			};
		});
	},
});
<<<<<<< HEAD
=======

function append_form(frm) {
    if (frm.is_new()) return;

    $(frm.fields_dict.gstr3b_form.wrapper).empty();
    $(
        frappe.render_template("gstr_3b_report", {
            data: JSON.parse(frm.doc.json_output),
        })
    ).appendTo(frm.fields_dict.gstr3b_form.wrapper);
}
>>>>>>> 1abb2db5 (fix: update naming rule and set field's value properly)
