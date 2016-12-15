define(['dojo/_base/declare', 
  'jimu/BaseWidget', 
  'esri/dijit/editing/AttachmentEditor', 
  'dojo/dom', 
  'dojo/_base/lang'],
  function(declare, 
    BaseWidget, 
    AttachmentEditor,
    dom, 
    lang) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-customwidget',
      featureLayer: null,
      attachmentEditor: null,
      infoTemplate: null,

      //this property is set by the framework when widget is loaded.
      name: 'AttachmentEditor',

      //methods to communication with app container:

      postCreate: function() {
        this.inherited(arguments);
        console.log('postCreate');
      },

      startup: function() {
        this.inherited(arguments);
        console.log('startup');
        this._attachment();
        //Getting track layer
        this.featureLayer = this.map.getLayer("CaminosEditables_6185");
      },

      //Attachment editor creation and starting up
      _attachment: function() {
        this.attachmentEditor = new AttachmentEditor({}, dom.byId("attachEditor"));
        this.attachmentEditor.startup();
      },

      //Function which shows some fields feature layer info and existing attachments
      _infoAttachEdit: function(evt) {
          var nameField = evt.graphic.attributes["NAME"];
          var denField = evt.graphic.attributes["DENOMINACION"];
          document.getElementById("nameTrack").innerHTML = nameField + ". ";
          document.getElementById("denTrack").innerHTML = denField;
          this.attachmentEditor.showAttachments(evt.graphic,this.featureLayer);
      },

      onOpen: function(){
        console.log('onOpen');
        //Executing _infoAttachEdit function with previous feature layer
        this.featureLayer.on("click", lang.hitch(this, this._infoAttachEdit));
      },

      onClose: function(){
        console.log('onClose');
        this.featureLayer.on("click", null);
        document.getElementById("nameTrack").innerHTML = "";
        document.getElementById("denTrack").innerHTML = "";
      },

      onMinimize: function(){
        console.log('onMinimize');
        this.featureLayer.on("click", null);
        document.getElementById("nameTrack").innerHTML = "";
        document.getElementById("denTrack").innerHTML = "";
      },

      onMaximize: function(){
        console.log('onMaximize');
        this.featureLayer.on("click", lang.hitch(this, this._infoAttachEdit));
      }
  });
});