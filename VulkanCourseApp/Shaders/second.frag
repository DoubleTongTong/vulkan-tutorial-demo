#version 450
#extension GL_KHR_vulkan_glsl : enable

layout(input_attachment_index = 0, binding = 0) uniform subpassInput inputColor; // Color output from subpass 1
layout(input_attachment_index = 1, binding = 1) uniform subpassInput inputDepth; // Depth output from subpass 2

layout(location = 0) out vec4 color;

void main()
{
	int xHalf = 1366 / 2;
	if (gl_FragCoord.x > xHalf)
	{
		float depth = subpassLoad(inputDepth).r;

		float minDepth = 0.9996f;
		float maxDepth = 1.0f;

		float depthColor = (depth - minDepth) / (maxDepth - minDepth);
		depthColor = clamp(depthColor, 0.0f, 1.0f);

		color = vec4(depthColor, depthColor, depthColor, 1.0f);
	}
	else
	{
		color = subpassLoad(inputColor).rgba;
	}
}


