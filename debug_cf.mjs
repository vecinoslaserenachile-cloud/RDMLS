async function checkCF() {
  const email = "Vecinoslaserenachile@gmail.com";
  const key = "bb53aaa5c29acc38c183291529a1dd8937d18";
  
  const headers = {
    "X-Auth-Email": email,
    "X-Auth-Key": key,
    "Content-Type": "application/json"
  };

  try {
    // 1. Get Accounts
    const accResp = await fetch("https://api.cloudflare.com/client/v4/accounts", { headers });
    const accounts = await accResp.json();
    console.log("ACCOUNTS:", JSON.stringify(accounts.result?.map(a => ({ id: a.id, name: a.name }))));
    
    if (!accounts.result?.[0]) return;
    const accountId = accounts.result[0].id;
    
    // 2. Get Pages Projects
    const projectsResp = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects`, { headers });
    const projects = await projectsResp.json();
    console.log("PROJECTS:", JSON.stringify(projects.result?.map(p => ({ 
      name: p.name, 
      subdomain: p.subdomain,
      repo: p.source?.config?.repo_name,
      owner: p.source?.config?.owner,
      production_branch: p.source?.config?.production_branch,
      latest_deployment: p.latest_deployment?.status
    }))));

    // 3. Get Deployments for the first project if it matches what we think
    const project = projects.result?.[0];
    if (project) {
        const deploysResp = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${project.name}/deployments`, { headers });
        const deploys = await deploysResp.json();
        console.log("LATEST DEPLOYS:", JSON.stringify(deploys.result?.slice(0, 3).map(d => ({
            id: d.id,
            status: d.latest_stage?.status,
            commit: d.deployment_trigger?.metadata?.commit_message,
            created: d.created_on
        }))));
    }
  } catch (err) {
    console.error("CF API ERROR:", err);
  }
}
checkCF();
