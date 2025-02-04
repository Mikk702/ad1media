// Service Descriptions
const services = {
  ec2: {
    name: "Amazon EC2",
    description: "Virtual servers in the cloud.",
    link: "https://aws.amazon.com/ec2/", // Link to EC2 docs
  },
  lambda: {
    name: "AWS Lambda",
    description: "Serverless compute.",
    link: "https://aws.amazon.com/lambda/", // Link to Lambda docs
  },
  // ... other services
};

// Populate Service Descriptions and Links
for (const serviceId in services) {
  const service = services[serviceId];
  const div = document.getElementById(serviceId);
  if(div){
    div.querySelector("p").textContent = service.description;
    const h3 = div.querySelector("h3");
    const link = document.createElement('a');
    link.href = service.link;
    link.target = "_blank"; // Open in a new tab
    link.textContent = h3.textContent;
    h3.innerHTML = ""; // Clear old text
    h3.appendChild(link);
  }
}

// YAML Configuration (Hardcoded for simplicity in this version)
const yamlOutput = `
# ... (Your YAML configuration) ...
`;

document.getElementById('yaml-output').value = yamlOutput;