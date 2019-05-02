import * as React from 'react';


export namespace IHome {
    export interface Props {
          title : string
    }
}
  
export class Home extends React.Component<IHome.Props> {
    constructor(props: IHome.Props) {
        super(props);
      }
  
   render() {
      return (
         <div>
          <div>AboutUs</div>
         </div> 
      );
    }
  }