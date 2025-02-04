// Service Descriptions and Links
const services = {
  ec2: {
    name: "Amazon EC2",
    description: "Virtual servers in the cloud.",
    link: "https://aws.amazon.com/ec2/",
  },
  lambda: {
    name: "AWS Lambda",
    description: "Serverless compute.",
    link: "https://aws.amazon.com/lambda/",
  },
  s3: {
    name: "Amazon S3",
    description: "Object storage.",
    link: "https://aws.amazon.com/s3/",
  },
  rds: {
    name: "Amazon RDS for MySQL",
    description: "Relational database.",
    link: "https://aws.amazon.com/rds/",
  },
  iam: {
    name: "AWS IAM",
    description: "Identity and access management.",
    link: "https://aws.amazon.com/iam/",
  },
  cognito: {
    name: "Amazon Cognito",
    description: "User authentication and authorization.",
    link: "https://aws.amazon.com/cognito/",
  },
};

// Populate Service Descriptions and Links
for (const serviceId in services) {
  const service = services[serviceId];
  const div = document.getElementById(serviceId);
  if (div) {
    div.querySelector("p").textContent = service.description;
    const h3 = div.querySelector("h3");
    const link = document.createElement('a');
    link.href = service.link;
    link.target = "_blank";
    link.textContent = h3.textContent;
    h3.innerHTML = "";
    h3.appendChild(link);
  }
}

// YAML Configuration (Using a JavaScript object for structure)
const architecture = {
  architecture: {
    compute: [
      {
        ec2: {
          instance_type: "t2.micro",
          description: "Virtual servers in the cloud",
        },
      },
      {
        lambda: {
          runtime: "python3.9",
          description: "Serverless compute",
        },
      },
    ],
    storage: {
      s3: {
        bucket_name: "my-website-bucket",
        description: "Object storage",
      },
    },
    database: {
      rds: {
        engine: "mysql",
        description: "Relational database",
      },
    },
    security: {
      iam: {
        description: "Identity and access management",
      },
    },
    auth: {
      cognito: {
        description: "User authentication and authorization",
      },
    },
  },
};

// Convert the JavaScript object to YAML (you'll need a YAML library)
// For simplicity, I'm hardcoding it here.  In a real app, use js-yaml or similar.

const yamlOutput = `
architecture:
  compute:
    - ec2:
        instance_type: t2.micro
        description: "Virtual servers in the cloud"
    - lambda:
        runtime: python3.9
        description: "Serverless compute"
  storage:
    s3:
      bucket_name: my-website-bucket
      description: "Object storage"
  database:
    rds:
      engine: mysql
      description: "Relational database"
  security:
    iam:
      description: "Identity and access management"
  auth:
    cognito:
      description: "User authentication and authorization"
`;


document.getElementById('yaml-output').value = yamlOutput;