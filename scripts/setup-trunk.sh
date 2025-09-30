#!/bin/bash

# Trunk Flaky Tests Setup Script
# This script helps configure GitHub Actions for Trunk integration

echo "🚀 Trunk Flaky Tests Setup"
echo "=========================="
echo ""

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Get repository information
REPO_URL=$(git remote get-url origin 2>/dev/null || echo "Not found")
echo "📁 Repository: $REPO_URL"
echo ""

echo "📋 Setup Checklist:"
echo "==================="
echo ""

echo "1. 🔑 GitHub Secrets Configuration:"
echo "   - Go to: https://github.com/$(echo $REPO_URL | sed 's/.*github.com[:/]\([^/]*\/[^/]*\)\.git.*/\1/')/settings/secrets/actions"
echo "   - Add secret: TRUNK_API_TOKEN"
echo "   - Value: Your Trunk API token"
echo ""

echo "2. 🏢 Trunk Organization:"
echo "   - Current org-slug: alex-test"
echo "   - Update in workflow files if different"
echo ""

echo "3. 🧪 Test XML Reports:"
echo "   - Pattern: test-reports/*.xml"
echo "   - Generated automatically on test runs"
echo ""

echo "4. 🔄 Workflow Files Updated:"
echo "   ✅ .github/workflows/pr-checks.yml"
echo "   ✅ .github/workflows/test.yml"
echo "   ✅ .github/workflows/ci.yml"
echo ""

echo "5. 📊 Next Steps:"
echo "   - Push changes to GitHub"
echo "   - Create a test PR to verify uploads"
echo "   - Check Trunk dashboard for test results"
echo ""

echo "🔗 Useful Links:"
echo "================"
echo "• Trunk Dashboard: https://app.trunk.io"
echo "• GitHub Actions: https://github.com/$(echo $REPO_URL | sed 's/.*github.com[:/]\([^/]*\/[^/]*\)\.git.*/\1/')/actions"
echo "• Repository Secrets: https://github.com/$(echo $REPO_URL | sed 's/.*github.com[:/]\([^/]*\/[^/]*\)\.git.*/\1/')/settings/secrets/actions"
echo ""

echo "✅ Setup complete! Remember to configure your GitHub secret."
