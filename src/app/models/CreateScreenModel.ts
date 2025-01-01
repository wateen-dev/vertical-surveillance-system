export interface CreateScreenModel {
    app_id: number;           // Represents the ID of the application
    app_name: string;         // Represents the name of the application
    module_id: number;        // Represents the ID of the module
    module_name: string;      // Represents the name of the module
    module_icon: string;      // Represents the name of the module
    submenu_name: string;      // Represents the Sub Menu Name
    submenu_icon: string;      // Represents the selected icon for the sub-menu
    created_by: string,
    updated_by: string,
    route_link: string;        // Represents the Route Link
    code_desc: string;        // Represents the Code Description
    isactive: boolean;        // Represents whether the screen is active
}

// Create a class that implements the interface
export class CreateScreen implements CreateScreenModel {
    constructor(
        public app_id: number,
        public app_name: string,
        public module_id: number,
        public module_name: string,
        public module_icon: string,
        public submenu_name: string,
        public submenu_icon: string,
        public created_by: string,
        public updated_by: string,
        public route_link: string,
        public code_desc: string,
        public isactive: boolean
    ) {}

   
      
}
