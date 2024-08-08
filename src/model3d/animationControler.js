export class PanelController {

  constructor(groups) {

      console.log("PanelController built with groups: ", groups);

      this.groups = groups;
      this.playing = false;
      
      this.paused = false;
      this.stopped = false;

  }

  // Method to start showing panels with delay
  async showPanelsWithDelay() {



      console.log("showPanelsWithDelay called");
      this.playing = true;
      this.stopped = false;
      this.paused = false;

      for (const groupName of Object.keys(this.groups)) {
          if (this.stopped) break;  // Exit if stopped

          const group = this.getGroup(groupName);
          const panelNames = Object.keys(group.panels);
          for (const panelName of panelNames) {
              if (this.stopped) break;  // Exit if stopped

              // Wait for the pause to be released
              while (this.paused) {
                  console.log("Paused");
                  if (this.stopped) break;  // Exit if stopped
                  await new Promise(resolve => setTimeout(resolve, 100)); // Check every 100ms
              }

              if (this.stopped) break;  // Exit if stopped

              await new Promise(resolve => setTimeout(resolve, 333)); // Wait for 333ms
              console.log("group :  ", group);
              console.log("panelNames :  ", panelName);
              const panel = group.panels[panelName];
              console.log("panel :  ", panel);
              panel.show();
          }
      }

      this.playing = false;

  }

  // Method to pause the process
  pause() {
      this.paused = true;
  }

  // Method to resume the process
  resume() {
      this.paused = false;
  }

  // Method to stop the process
  stop() {
      this.stopped = true;
  }

  // Mock method to simulate getting a group
  getGroup(groupName) {
      return this.groups[groupName];
  }
}