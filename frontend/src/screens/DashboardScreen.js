import DashboardMenu from "../component/DashboardMenu"

const DashboardScreen = {
    after_render:()=>{},
    render:()=>{
        return `
        <div class="dashboard">
            ${DashboardMenu.render({selected:'dashboard'})}
            <div class="dashboard-content">

                <h1>Dashboard</h1>
                <div class="dashboard-content">
                Add info and chart
                </div>
            </div>
        </div>
        `
    }
}

export default DashboardScreen